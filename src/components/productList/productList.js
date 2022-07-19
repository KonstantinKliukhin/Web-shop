import { Component } from 'react'

import ProductCard from '../productCard/ProductCard';

import './productList.scss';

class ProductList extends Component {
  render() {
    return (
        <div className="products__card-field">
            <ProductCard inStock addToCartEnabled/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
        </div>
    )
  }
}

export default ProductList;
