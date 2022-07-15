import { Component } from "react";

import ItemDescription from "../itemDescription/itemDescription";

import product from '../../resources/img/product.png';

import './cartItem.scss';


class CartItem extends Component {

    render() {

        return (
            <li className="cart__item">
                <ItemDescription/>
                <div className="cart__item__counter">
                    <div className="cart__item__counter__btn">
                        +
                    </div>
                    <p className="cart__item__counter__count">1</p>
                    <div className="cart__item__counter__btn">
                        -
                    </div>
                </div>
                <img src={product} alt={'cardItem'} className="cart__item__img" />
            </li>
        )
    }
}


export default CartItem;