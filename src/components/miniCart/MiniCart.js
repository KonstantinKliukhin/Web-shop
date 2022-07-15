import { Component } from "react";

import CartItem from "../cartItem/CartItem";

import './miniCartMenu.scss';


class MiniCart extends Component {

    render() {
        return (
            <div className="minicart-content">
                <p className='minicart-content__text'><span className='text-bold'>My bag</span>, 3 items</p>
                <ul className="minicart-content__list">
                    <CartItem/>
                    <CartItem/>
                    <CartItem/>
                    <CartItem/>
                    <CartItem/>
                </ul>
                <div className="flex-sb-center minicart-content__total-price">
                    <p className="minicart-content__total-price__text">Total:</p>
                    <p className="minicart-content__total-price__count">$200.00</p>
                </div>
                <div className="flex-sb-center minicart-content__btns-wrapper">
                    <button to='/cart' className="minicart-content__btn btn--left">View bag</button>
                    <button className="minicart-content__btn btn--right">check out</button>
                </div>
            </div>
        )
    }
}

export default MiniCart;