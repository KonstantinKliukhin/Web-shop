import { Component } from "react";

import Cart from "../../components/cart/Cart";


class CartPage extends Component {

    render() {

        return (
            <section className="container cart">
                    <Cart/>
            </section>
        )
    }
}

export default CartPage;