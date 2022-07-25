import { Component } from "react";

import {Interweave} from 'interweave';
import {transformToDescription} from '../../utils/transformToDescriptionJSX';

import ItemDescription from "../../components/itemDescription/itemDescription";
import ProductMedia from "../../components/productMedia/ProductMedia";

import { connect } from "react-redux";

import { fetchProduct, activeAtributeChanged} from "../../slices/productsSlice";
import { cartProductAdded } from "../../slices/cartSlice";

import {productsWithCorrectPriceSelector} from "../../selectors/productWithCorrectPrice";
import combineLoadingsSelector from "../../selectors/combineLoadingsSelector";

import setContent from "../../utils/setContent";

import './singleItemPage.scss';


class SingleItemPage extends Component {
    componentDidMount() {
        const {fetchProduct, id} = this.props;
        fetchProduct(id);
    }



    getSingleItemContent = () => {
        const { 
            product, 
            loadingStatus, 
            activeAtributeChanged, 
            cartProductAdded 
        } = this.props;

        const singleItemContent = (product) => {

            return (
                <>
                    <ProductMedia
                        smallImgWidth={80}
                        smallImgHeight={80}
                        bigImgWidth={610}
                        bigImgHeight={511}
                        gap={40}>
                        {product?.gallery?.map((img, i) => (
                            <img key={i} src={img} alt={product?.name}/>
                        ))}
                    </ProductMedia>
                        <div className="single-item__specification">
                            <ItemDescription 
                                price={product?.price} 
                                name={product?.name}
                                brand={product?.brand}
                                attributes={product?.attributes}
                                priceDown={true}
                                onSelectAtttribute={product.inStock ? activeAtributeChanged : null}
                                attributesIsDisabled={!product?.inStock}
                                />
                            <button 
                                onClick={product?.inStock ? () => cartProductAdded(product): null}
                                className={`single-item__specification__btn ${product?.inStock ? '':'disabled'}`}>
                                {product?.inStock ? 'ADD TO CART': 'Out of stock'}
                            </button>
                            <div className="single-item__specification__description">
                                <Interweave 
                                    content={product?.description} 
                                    transform={
                                        transformToDescription("single-item__specification__description")
                                    } 
                                    transformOnlyAllowList={false}
                                    tagName={'div'}
                                    allowList={['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'p', 'ul', 'li']}/>
                            </div>
                        </div> 
                </>
            )
        }

        return setContent([loadingStatus], singleItemContent, product)
    }


    render() {
        return (
            <section className=" container single-item">
                {this.getSingleItemContent()}
            </section>
        )
    }
}

const mapStateToProps = (state) => {    
    return {
        loadingStatus: combineLoadingsSelector(
            state,
            state => state.products.productLoadingStatus,
            state => state.currencies.currenciesLoadingStatus,
        ),
        product: productsWithCorrectPriceSelector(
            state => state.products.activeProduct,
            state
        ),
    }
}

export default connect(mapStateToProps, {fetchProduct, activeAtributeChanged, cartProductAdded})(SingleItemPage)
