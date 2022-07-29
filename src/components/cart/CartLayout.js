import { Component } from 'react';

import { arrayOf, bool, string, func, number } from 'prop-types';
import { cartProductType, priceType } from '../../types/productTypes';

import { Link } from 'react-router-dom';

import CartList from '../cartList/CartList';


class CartLayout extends Component {
    render() {
        const {
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
        } = this.props;

        return (
            <>
                <CartList 
                    type={`${mini ? 'mini-cart' : 'main-cart'}`}
                    cartProductsList={cartProductsList}
                    cartProductsIds={cartProductsIds}
                    isItemSlider={!mini}
                    onIncreaseCartProductCount={cartProductCountIncreased}
                    onDecreaseCartProductCount={cartProductCountDecreased}
                />
                <div className={`${mainClass}__count`}>
                    {mini || 
                        <>
                            <p className="cart__count__tax">Tax 21%: </p>
                            <p className="cart__count__number">
                                {`${cartTaxPrice?.currency?.symbol}${cartTaxPrice?.amount}`}
                            </p>
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
                            className="minicart__btn btn-white"
                        >
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
}

CartLayout.propTypes = {
    mini: bool,
    onToggleMenu: func,
    cartProductCountDecreased: func.isRequired,
    cartProductCountIncreased: func.isRequired,
    cartQuantity: number.isRequired,
    cartTaxPrice: priceType.isRequired,
    cartTotalPrice: priceType.isRequired,
    cartProductsIds: arrayOf(string).isRequired,
    cartProductsList: arrayOf(cartProductType).isRequired,
};

export default CartLayout;