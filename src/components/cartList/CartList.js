import { Component } from "react";

import { arrayOf, bool, string, func } from 'prop-types';
import { cartProductType } from '../../types/productTypes';

import CartItem from "../cartItem/CartItem";

import './cartList.scss';

class CartList extends Component {

    render() {
        const {
            type, 
            cartProductsList, 
            isItemSlider, 
            cartProductsIds, 
            onIncreaseCartProductCount, 
            onDecreaseCartProductCount
        } = this.props;
        
        return (
            <ul className={`cart__list ${type}`}>
                {
                    cartProductsList.map((cartProduct, i) => {
                        return (
                            <CartItem 
                                key={cartProductsIds[i]}
                                isSlider={isItemSlider}
                                cartProduct={cartProduct}
                                onIncreaseCartProductCount={onIncreaseCartProductCount}
                                onDecreaseCartProductCount={onDecreaseCartProductCount}
                            />
                        )
                    })
                }
            </ul>
        )
    }
}

CartList.propTypes = {
    type: string,
    isItemSlider: bool,
    cartProductsIds: arrayOf(string),
    onIncreaseCartProductCount: func.isRequired,
    onDecreaseCartProductCount: func.isRequired,
    cartProductsList: arrayOf(cartProductType).isRequired,
}

export default CartList;


