import { Component } from "react";

import CartItem from '../../components/cartItem/CartItem'

import './cartPage.scss';


class CartPage extends Component {

    render() {

        return (
            <section className="container cart">
                    <h1 className="cart__title">CART</h1>
                    <ul className="cart__list">
                        <hr className="cart__list__separator" />
                        <CartItem/>
                        <hr className="cart__list__separator" />
                        <CartItem/>
                        <hr className="cart__list__separator" />
                        <CartItem/>
                        <hr className="cart__list__separator" />
                        <CartItem/>
                        <hr className="cart__list__separator" />
                    </ul>
                    <div className="cart__count">
                        <p className="cart__count__tax">Tax 21%: </p>
                        <p className="cart__count__number">$42.00</p>
                        <p className="cart__count_quantity">Quantity: </p>
                        <p className="cart__count__number">3</p>
                        <p className="cart__count__total">Total: </p>
                        <p className="cart__count__number">$200.00</p>
                    </div>
                    <button className="cart__order-btn">ORDER</button>
            </section>
        )
    }
}

export default CartPage;