import { Component } from 'react'

import { Link } from 'react-router-dom';

import {connect} from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { 
    selectAllCartProducts, 
    selectCartProductsIds, 
    cartProductCountIncreased, 
    cartProductCountDecreased 
} from '../../slices/cartSlice';
import {productsWithCorrectPriceSelector, toCorrectPriceSelector} from '../../selectors/productWithCorrectPrice';

import CartList from '../cartList/CartList';

import './cart.scss';

class Cart extends Component {

    getCartContent = () => {
        const {
            mini, 
            cartProductsList, 
            onToggleMenu, 
            cartQuantity, 
            cartTotalPrice, 
            cartProductsIds,
            cartProductCountIncreased,
            cartProductCountDecreased,
        } = this.props;

        const mainClass = mini ? 'minicart' : 'cart';

        if (!cartProductsList?.length) {
            return (
                <div className={`${mainClass}-empty`}>
                    <p className={`${mainClass}-empty__text`}>
                        Add an item to your cart and it will appear here!
                    </p>
                </div>
            )
        }

        return (
            <>
                <CartList 
                    type={`${mini ? 'mini-cart' : 'main-cart'}`}
                    cartProductsList={cartProductsList}
                    cartProductsIds={cartProductsIds}
                    isItemSlider={!mini}
                    onIncreaseCartProductCount={cartProductCountIncreased}
                    onDecreaseCartProductCount={cartProductCountDecreased}/>
                <div className={`${mainClass}__count`}>
                    {mini || 
                        <>
                            <p className="cart__count__tax">Tax 21%: </p>
                            <p className="cart__count__number">$42.00</p>
                            <p className="cart__count_quantity">Quantity: </p>
                            <p className="cart__count__number">{cartQuantity}</p>
                        </>
                    }
                    <p className={`${mainClass}__count__total`}>Total: </p>
                    <p className={`${mainClass}__count__number`}>
                        {`${cartTotalPrice?.currency?.symbol}${cartTotalPrice?.amount}`}
                    </p>
                </div>
                <div className={`flex-sb-center ${mainClass}__btns-wrapper`}>
                    {mini && 
                        <Link 
                            onClick={onToggleMenu} 
                            to='/cart' 
                            className="minicart__btn btn-white">
                                View bag
                        </Link>
                    }
                    <button className={`${mainClass}__btn btn-green`}>
                        {mini ? 'CHECK OUT' : 'ORDER'}
                    </button>    
                </div>
            </>
        )
    }

    render() {
        const {mini, cartQuantity } = this.props;

        const mainClass = mini ? 'minicart' : 'cart';

        return (
            <div className={mainClass}>
                {mini ? 
                    (<p className='minicart__title'>
                        <span className='text-bold'>My bag</span>, {cartQuantity} items
                    </p>) :
                    <h1 className={`cart__title`}>CART</h1> 
                }
                {this.getCartContent()}
            </div>
        )
    }
}

const totalPriceSelector = createSelector(
    (state) => state.cart.cartTotalPrice,
    (state) => state.currencies.activeCurrency,
    toCorrectPriceSelector
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
    }
}

export default connect(mapStateToProps, {cartProductCountIncreased, cartProductCountDecreased})(Cart);
