import { Component } from 'react'

import ProductCard from '../productCard/ProductCard';

import {fetchProducts, selectAllProducts} from '../../slices/productsSlice';
import { activeCategoryChanged } from '../../slices/categoriesSlice';
import { cartProductAdded } from '../../slices/cartSlice';

import { connect} from 'react-redux';

import setContent from '../../utils/setContent';

import {productsWithCorrectPriceSelector} from '../../selectors/productWithCorrectPrice';

import './productList.scss';

class ProductList extends Component {

  componentDidMount() {
    const {fetchProducts, activeCategory} = this.props;
    fetchProducts(activeCategory);
  }
  
  componentDidUpdate(prevProps) {
    const {fetchProducts, activeCategory} = this.props;

    if (activeCategory !== prevProps.activeCategory) {
      fetchProducts(activeCategory);
    }
  }

  getProductList = () => {
    const {productsLoadingStatus, products, activeCategory, cartProductAdded} = this.props;

    const productList = ({products, activeCategory}) => {
      return products?.map(product => {
        return (
            <ProductCard
              key={product?.id}
              cardPath={`/${activeCategory}/${product?.id}`}   
              name={product?.name}
              brand={product?.brand}
              inStock={product?.inStock}
              gallery={product?.gallery ? product?.gallery[0] : null}
              price = {product?.price}
              id= {product?.id}
              onCartBtnClick={product?.inStock ? 
                () => cartProductAdded(product) : null}
              activeCategory
            />
        )
      })
    }



    return setContent([productsLoadingStatus], productList, {products, activeCategory})
  }

  render() {
    const {activeCategory, title} = this.props;
    return (
      <>
        {title && <h1 className="products__title">{activeCategory}</h1>}
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
    productsLoadingStatus: state.products.productsLoadingStatus,
    activeCategory: state.categories.activeCategory,
  }
}
export default connect(mapStateToProps, {fetchProducts, activeCategoryChanged, cartProductAdded})(ProductList);


