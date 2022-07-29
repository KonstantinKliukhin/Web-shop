import { Component } from "react";

import { Helmet } from 'react-helmet';

import ProductsList from '../../components/productsList/productsList';

import withSetCorrectCategory from "../../components/HOC/withSetCorrectCategory";

import ErrorBoundery from "../../components/errorBoundary/ErrorBoundary";

class ProductsPage extends Component {
    render() {
        const { activeCategory } = this.props;

        return(
            <section className="container products">
                <Helmet>
                    <title>{activeCategory} products</title>
                    <meta
                        name="description"
                        content={`List of ${activeCategory} products in webshop`}
                    />
                </Helmet>
                <ErrorBoundery>
                    <ProductsList title/>
                </ErrorBoundery>
            </section>
        )
    }
}

export default withSetCorrectCategory(ProductsPage);





