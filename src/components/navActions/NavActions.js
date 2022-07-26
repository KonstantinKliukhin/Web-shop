import {Component} from 'react';

import Cart from '../cart/Cart';
import DropDownMenu from '../dropDownMenu/DropDownMenu';
import DropDownList from '../dropDownList/DropDownList';

import {connect} from 'react-redux';
import { currenciesStyles, miniCartStyles } from './dropDownStyles';

import setContent from '../../utils/setContent';

import emptyCart from '../../resources/img/emptyCart.svg';

import './navActions.scss';


import { 
    fetchCurrencies, 
    selectAllcurrencies, 
    activeCurrencyChanged 
} from '../../slices/currencieSlice';

class NavActions extends Component {

    componentDidMount() {
        this.props.fetchCurrencies()
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

        return setContent(
            [currenciesLoadingStatus],
             (props) => <DropDownList {...props}/>, 
             {
                name: 'currencies',
                id: 'currencies',
                isArrow: true,
                onChange: this.onChangeCurrency,
                styles: currenciesStyles,

                select: {
                    value: currencies[0]?.id,
                    label: currencies[0]?.label,
                    activeTitle: currencies[0]?.symbol,
                },

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
                    mini={true}
                    content={(props) => <Cart {...props}/>}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currencies: selectAllcurrencies(state),
        currenciesLoadingStatus: state.currencies.currenciesLoadingStatus,
        cartQuantity: state.cart.cartQuantity,
    }
}
export default connect(
    mapStateToProps, 
    {fetchCurrencies, activeCurrencyChanged}
)(NavActions);
