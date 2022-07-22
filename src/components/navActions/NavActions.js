import {Component} from 'react';

import MiniCart from '../miniCart/MiniCart';
import DropDownMenu from '../dropDownMenu/DropDownMenu';
import DropDownList from '../dropDownList/DropDownList';

import './navActions.scss';
import { currenciesStyles, miniCartStyles } from './dropDownStyles';

import emptyCart from '../../resources/img/emptyCart.svg';

import {connect} from 'react-redux';

import setContent from '../../utils/setContent';

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
        const CartCounter = (
            <>
                <img src={emptyCart} alt="emptyCart"/>
                <div className="nav__cart-menu__item-count">3</div>
            </>
        )


        return(
            <div className="nav__actions">
                {this.getDropDownList()}
                <DropDownMenu
                    isOverlay
                    styles = {miniCartStyles}
                    title = {CartCounter}
                    content={(props) => <MiniCart {...props}/>}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currencies: selectAllcurrencies(state),
        currenciesLoadingStatus: state.currencies.currenciesLoadingStatus
    }
}
export default connect(
    mapStateToProps, 
    {fetchCurrencies, activeCurrencyChanged}
)(NavActions);
