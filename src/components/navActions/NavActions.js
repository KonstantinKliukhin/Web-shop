import {Component} from 'react';

import { func, number, string } from 'prop-types';
import { currenciesType } from '../../types/currenciesTypes';

import {connect} from 'react-redux';
import { fetchCurrencies, activeCurrencyChanged } from '../../slices/currencieSlice';

import setContent from '../../utils/setContent';

import Cart from '../cart/Cart';
import DropDownMenu from '../dropDownMenu/DropDownMenu';
import DropDownList from '../dropDownList/DropDownList';

import emptyCart from '../../assets/images/emptyCart.svg';

import { currenciesStyles, miniCartStyles } from './dropDownStyles';

import './navActions.scss';


class NavActions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeCurrency: null,
        }
    }

    componentDidMount() {
        const {fetchCurrencies, activeCurrency} = this.props;

        fetchCurrencies()

        this.setState({
            activeCurrency: activeCurrency,
        })
    }

    onChangeCurrency = ({activeTitle, label, value}) => {
        const {activeCurrencyChanged} = this.props;
        
        activeCurrencyChanged({
            symbol: activeTitle,
            label: label,
            id: value,
        })
    }

    getDropDownList = () => {
        const {
            currencies,  
            currenciesLoadingStatus,
        } = this.props;

        const { activeCurrency } = this.state;

        const select = activeCurrency ? 
            {
                value: activeCurrency.id,
                label: activeCurrency.label,
                activeTitle: activeCurrency.symbol,
            } :
            {
                value: currencies[0]?.id,
                label: currencies[0]?.label,
                activeTitle: currencies[0]?.symbol,
            }

        return setContent(
            [currenciesLoadingStatus],
             (props) => <DropDownList {...props}/>, 
             {
                name: 'currencies',
                id: 'currencies',
                isArrow: true,
                onChange: this.onChangeCurrency,
                styles: currenciesStyles,
                select,
                list: currencies.map(currency => {
                    return ({
                            value: currency.id,
                            label: currency.label,
                            activeTitle: currency.symbol,
                    })
                })
            }
        )
    }

    render() {
        const {cartQuantity} = this.props;

        const CartCounter = (
            <>
                <img src={emptyCart} alt="emptyCart"/>
                {cartQuantity > 0 && 
                    (<div className="nav__cart-menu__item-count">
                        {cartQuantity}
                    </div>)
                }
            </>
        )

        return(
            <div className="nav__actions">
                {this.getDropDownList()}
                <DropDownMenu
                    isOverlay
                    styles = {miniCartStyles}
                    title = {CartCounter}
                    mini= {true}
                    content={(props) => <Cart {...props}/>}
                />
            </div>
        )
    }
}

NavActions.propTypes = {
    fetchCurrencies: func.isRequired,
    activeCurrencyChanged: func.isRequired,
    currenciesLoadingStatus: string.isRequired,
    cartQuantity: number.isRequired,
    currencies: currenciesType,
}

const mapStateToProps = (state) => {
    return {
        currencies: state.currencies.currencies,
        currenciesLoadingStatus: state.currencies.currenciesLoadingStatus,
        cartQuantity: state.cart.cartQuantity,
        activeCurrency: state.currencies.activeCurrency,
    }
}

export default connect(
    mapStateToProps, 
    {
        fetchCurrencies, 
        activeCurrencyChanged
    }
)(NavActions);
