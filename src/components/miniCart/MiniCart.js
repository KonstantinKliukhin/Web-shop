import { Component } from "react";
import {Link} from 'react-router-dom';

import CartList from "../cartList/CartList";

import './miniCartMenu.scss';


class MiniCart extends Component {

    render() {
        const {onToggleMenu} = this.props;

        return (
            <div className="minicart-content">
                <p className='minicart-content__text'><span className='text-bold'>My bag</span>, 3 items</p>
                <CartList name='mini-cart'/>
                <div className="flex-sb-center minicart-content__total-price">
                    <p className="minicart-content__total-price__text">Total:</p>
                    <p className="minicart-content__total-price__count">$200.00</p>
                </div>
                <div className="flex-sb-center minicart-content__btns-wrapper">
                    <Link onClick={onToggleMenu} to='/cart' className="minicart-content__btn btn--left">View bag</Link>
                    <button className="minicart-content__btn btn--right">check out</button>
                </div>
            </div>
        )
    }
}

export default MiniCart;