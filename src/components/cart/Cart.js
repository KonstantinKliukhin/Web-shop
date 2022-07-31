import { Component } from 'react';

import { arrayOf, bool, string, func, number } from 'prop-types';
import { cartProductType, priceType } from '../../types/productTypes';

import setContent from '../../utils/setContent';

import {connect} from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { 
    selectAllCartProducts, 
    selectCartProductsIds, 
    cartProductCountIncreased, 
    cartProductCountDecreased 
} from '../../slices/cartSlice';

import {productsWithCorrectPriceSelector, toCorrectPriceSelector} from '../../selectors/priceSelectors';

import CartLayout from './CartLayout';

import Page404 from '../../pages/404/404';

import './cart.scss';


class Cart extends Component {
    render() {
        const {
            mini, 
            cartProductsList, 
            onToggleMenu, 
            cartQuantity, 
            cartTotalPrice, 
            cartProductsIds,
            cartProductCountIncreased,
            cartProductCountDecreased,
            cartTaxPrice,
            currenciesLoadingStatus,
        } = this.props;

        const mainClass = mini ? 'minicart' : 'cart';

        let content;

        if (!cartProductsList?.length) {
            content = (
                <div className={`${mainClass}-empty`}>
                    <p className={`${mainClass}-empty__text`}>
                        Add an item to your cart and it will appear here!
                    </p>
                </div>
            )
        } else {
            content = setContent(
                [currenciesLoadingStatus],
                (props) => <CartLayout {...props}/>,
                {
                    mini, 
                    cartProductsList, 
                    cartProductsIds, 
                    mainClass, 
                    cartTaxPrice, 
                    cartQuantity, 
                    cartTotalPrice, 
                    onToggleMenu,
                    cartProductCountIncreased,
                    cartProductCountDecreased,
                },
                true,
                <Page404/>
            )
        }

        return (
            <div className={mainClass}>
                {mini ? 
                    (<p className='minicart__title'>
                        <span className='text-bold'>My bag</span>, {cartQuantity} items
                    </p>) :
                    <h1 className={`cart__title`}>CART</h1> 
                }
                {content}
            </div>
        )
    }
}

Cart.propTypes = {
    mini: bool,
    onToggleMenu: func,
    cartProductCountDecreased: func.isRequired,
    cartProductCountIncreased: func.isRequired,
    cartQuantity: number.isRequired,
    cartTaxPrice: priceType,
    cartTotalPrice: priceType,
    cartProductsIds: arrayOf(string),
    cartProductsList: arrayOf(cartProductType)
};

const totalPriceSelector = createSelector(
    (state) => state.cart.cartTotalPrice,
    (state) => state.currencies.activeCurrency,
    toCorrectPriceSelector
);

const TaxPriceSelector = createSelector(
    (state) => state.cart.cartTaxPrice,
    (state) => state.currencies.activeCurrency,
    toCorrectPriceSelector
);

const currenciesLoadingSelector = createSelector(
    state => state.currencies.currenciesLoadingStatus,
    state => state.currencies.activeCurrency,
    (currenciesLoadingStatus, activeCurrency) => {
        if (currenciesLoadingStatus === 'confirmed' && !activeCurrency) {
            return 'loading'
        } else {
            return currenciesLoadingStatus
        }
    }
)

const mapStateToProps = (state) => {
    return {
        cartProductsList: productsWithCorrectPriceSelector(
            (state) => selectAllCartProducts(state),
            state
        ),
        cartProductsIds: selectCartProductsIds(state),
        cartTotalPrice: totalPriceSelector(state),
        cartQuantity: state.cart.cartQuantity,
        cartTaxPrice: TaxPriceSelector(state),
        currenciesLoadingStatus: currenciesLoadingSelector(state),
    }
};

export default connect(
    mapStateToProps, 
    {
        cartProductCountIncreased, 
        cartProductCountDecreased
    }
)(Cart);
