import { Component } from "react";
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
                            />)
                    })
                }
            </ul>
        )
    }
}


export default CartList;


