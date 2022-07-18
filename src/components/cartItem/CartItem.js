import { Component } from "react";

import ItemDescription from "../itemDescription/itemDescription";
import Slider from "../slider/Slider";

import product from '../../resources/img/product.png';

import './cartItem.scss';


class CartItem extends Component {

    render() {
        let imagesView;
        if (this.props.slider) {
            imagesView = (
                <Slider height={288} width={200}>
                    <img src={product} alt={'cardItem'} className="cart__item__img" />
                    <img src={product} alt={'cardItem'} className="cart__item__img" />
                    <img src={product} alt={'cardItem'} className="cart__item__img" />
                </Slider>
            ) 
        } else {
            imagesView = (
                <>
                    <img src={product} alt={'cardItem'} className="cart__item__img" />
                </>
            )
        }
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
                {imagesView}
            </li>
        )
    }
}


export default CartItem;