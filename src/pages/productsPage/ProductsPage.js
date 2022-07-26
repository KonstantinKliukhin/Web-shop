import { Component } from "react";

import ProductList from '../../components/productList/productList';

import withSetCorrectCategory from "../../components/HOC/withSetCorrectCategory";

import ErrorBoundery from "../../components/errorBoundary/ErrorBoundary";

class ProductsPage extends Component {
    render() {
        return(
            <section className="container products">
                <ErrorBoundery>
                    <ProductList title/>
                </ErrorBoundery>
            </section>
        )
    }
}

export default withSetCorrectCategory(ProductsPage);





