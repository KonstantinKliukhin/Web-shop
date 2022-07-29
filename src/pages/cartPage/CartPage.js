import { Component } from "react";

import { Helmet } from 'react-helmet';

import Cart from "../../components/cart/Cart";

import ErrorBoundery from "../../components/errorBoundary/ErrorBoundary";


class CartPage extends Component {
    render() {
        return (
            <section className="container cart">
                <Helmet>
                    <title>Cart</title>
                    <meta
                        name="description"
                        content="Cart of products"
                    />
                </Helmet>
                <ErrorBoundery>
                    <Cart/>
                </ErrorBoundery>
            </section>
        )
    }
}

export default CartPage;