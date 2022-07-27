import { Component } from "react";

import ItemDescription from "../itemDescription/itemDescription";
import Slider from "../slider/Slider";

import noImageAvailable from '../../resources/img/noImageAvailable.jpg';

import './cartItem.scss';


class CartItem extends Component {

    onDecreaseCartProductCount = (e, cartProduct) => {
        e.stopPropagation()
        this.props.onDecreaseCartProductCount(cartProduct)
    }

    render() {
        const {
            isSlider,
            cartProduct, 
            onIncreaseCartProductCount, 
        } = this.props;

        const {name, brand, attributes, price, gallery, count,} = cartProduct;

        let imagesView;

        if (isSlider && gallery?.length > 1) {
            imagesView = (
                <Slider height={288} width={200}>
                    {gallery.map((image, i) => {
                        return <img 
                                    key={i}
                                    src={image} 
                                    alt={name} 
                                    className='cart__item__img'/>
                    })}
                </Slider>
            ) 
        } else {
            imagesView = (
                    <img 
                        src={gallery?.length ? gallery[0] : noImageAvailable} 
                        alt={name} 
                        className="cart__item__img" 
                    />
            )
        }

        return (
            <li className="cart__item">
                <ItemDescription 
                    name={name} 
                    brand={brand} 
                    attributes={attributes} 
                    attributesSelectionIsDisabled
                    price={price} />
                <div className="cart__item__counter">
                    <button 
                        onClick={() => onIncreaseCartProductCount(cartProduct)}
                        className="cart__item__counter__btn">
                        +
                    </button>
                    <p className="cart__item__counter__count">{count}</p>
                    <button
                        onClick={(e) => this.onDecreaseCartProductCount(e, cartProduct)} 
                        className="cart__item__counter__btn">
                        -
                    </button>
                </div>
                {imagesView}
            </li>
        )
    }
}


export default CartItem;