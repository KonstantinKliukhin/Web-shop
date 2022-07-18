import { Component } from "react";
import CartItem from "../cartItem/CartItem";



class CartList extends Component {

    render() {
        
        return (
            <ul className={`cart__list ${this.props.name}`}>
                <CartItem/>
                <CartItem/>
                <CartItem/>
                <CartItem/>
            </ul>
        )
    }
}


export default CartList;


