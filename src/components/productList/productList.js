import { Component } from 'react'

import ProductCard from '../productCard/ProductCard';

import {fetchProducts, selectAllProducts} from '../../slices/productsSlice';
import { activeCategoryChanged } from '../../slices/categoriesSlice';
import { cartProductAdded } from '../../slices/cartSlice';

import { connect} from 'react-redux';

import setContent from '../../utils/setContent';

import {productsWithCorrectPriceSelector} from '../../selectors/productWithCorrectPrice';
import combineLoadingsSelector from '../../selectors/combineLoadingsSelector';


import './productList.scss';

class ProductList extends Component {
  
  componentDidUpdate(prevProps) {
    const {fetchProducts, activeCategory} = this.props;

    if (activeCategory !== prevProps.activeCategory) {
      fetchProducts(activeCategory);
    }
  }

  getProductList = () => {
    const {loadingStatus, products, activeCategory, cartProductAdded} = this.props;

    const productList = ({products, activeCategory}) => {
      return products.map(product => {
        return (
            <ProductCard
              key={product.id}
              cardPath={`/${activeCategory}/${product.id}`}   
              name={product.name}
              brand={product.brand}
              inStock={product.inStock}
              gallery={product.gallery[0]}
              price = {product.price}
              id= {product.id}
              onCartBtnClick={product.inStock ? 
                () => cartProductAdded(product) : null}
              activeCategory
            />
        )
      })
    }

    return setContent([loadingStatus], productList, {products, activeCategory})
  }

  render() {
    const {activeCategory} = this.props;
    return (
      <>
        <h1 className="products__title">{activeCategory}</h1>
        <div className="products__card-field">
          {this.getProductList()}
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: productsWithCorrectPriceSelector(
      state => selectAllProducts(state),
      state
    ),
    loadingStatus: combineLoadingsSelector(
      state,
      state => state.products.productsLoadingStatus,
      state => state.currencies.currenciesLoadingStatus,
    ),
    activeCategory: state.categories.activeCategory,
  }
}
export default connect(mapStateToProps, {fetchProducts, activeCategoryChanged, cartProductAdded})(ProductList);


