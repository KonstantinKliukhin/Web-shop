import { Component } from 'react'

import { func, string } from 'prop-types';
import { listProductsType } from '../../types/productTypes';

import setContent from '../../utils/setContent';

import { connect } from 'react-redux';

import {productsWithCorrectPriceSelector} from '../../selectors/productWithCorrectPrice';

import {fetchProducts, selectAllProducts} from '../../slices/productsSlice';
import { activeCategoryChanged } from '../../slices/categoriesSlice';
import { cartProductAdded } from '../../slices/cartSlice';

import ProductCard from '../productCard/ProductCard';

import './productsList.scss';


class ProductsList extends Component {

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

    getProductsList = () => {
        const {
            productsLoadingStatus, 
            products, 
            activeCategory, 
            cartProductAdded
        } = this.props;

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
                <ul className="products__card-field" aria-live='assertive'>
                    {this.getProductsList()}
                </ul>
            </>
        )
    }
}

ProductsList.propTypes = {
    fetchProducts: func.isRequired,
    activeCategory: string,
    productsLoadingStatus: string.isRequired,
    cartProductAdded: func.isRequired,
    products: listProductsType,
}

const mapStateToProps = (state) => {
    return {
        productsLoadingStatus: state.products.productsLoadingStatus,
        products: productsWithCorrectPriceSelector(
            state => selectAllProducts(state),
            state
        ),
        activeCategory: state.categories.activeCategory,
    }
}

export default connect(
    mapStateToProps,
    {
        fetchProducts, 
        activeCategoryChanged, 
        cartProductAdded
    }
)(ProductsList);


