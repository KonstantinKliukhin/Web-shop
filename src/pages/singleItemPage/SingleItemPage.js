import { Component } from "react";

import {Interweave} from 'interweave';
import {transformToDescription} from '../../utils/transformToDescriptionJSX';

import ItemDescription from "../../components/itemDescription/itemDescription";
import ProductMedia from "../../components/productMedia/ProductMedia";
import Page404 from "../404/404";
import Spinner from "../../components/spinner/Spinner";

import { connect } from "react-redux";
import { compose } from "@reduxjs/toolkit";

import { fetchProduct, activeAtributeChanged} from "../../slices/productsSlice";
import { cartProductAdded } from "../../slices/cartSlice";

import {productsWithCorrectPriceSelector} from "../../selectors/productWithCorrectPrice";

import setContent from "../../utils/setContent";

import withSetCorrectCategory from "../../components/HOC/withSetCorrectCategory";

import './singleItemPage.scss';


class SingleItemPage extends Component {
    componentDidMount() {
        const {fetchProduct, id} = this.props;
        fetchProduct(id);
    }

    getSingleItemContent = () => {
        const { 
            product, 
            productLoadingStatus, 
            activeAtributeChanged, 
            cartProductAdded 
        } = this.props;

        const isActiveBtn = product?.inStock && product?.price; 

        const singleItemContent = (product) => {

            return (
                <section className=" container single-item">
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
                                onSelectAtttribute={product?.inStock ? activeAtributeChanged : null}
                                attributesIsDisabled={!product?.inStock}
                                />
                            <button 
                                onClick={isActiveBtn ? () => cartProductAdded(product): null}
                                className={`single-item__specification__btn ${isActiveBtn ? '':'disabled'}`}>
                                {isActiveBtn ? 'ADD TO CART': 'Out of stock'}
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
                </section>
            )
        }

        return setContent([productLoadingStatus], singleItemContent, product, Spinner, Page404)
    }


    render() {
        return (
            <>
                {this.getSingleItemContent()}
            </>
        )
    }
}

const mapStateToProps = (state) => {    
    return {
        productLoadingStatus: state.products.productLoadingStatus,
        product: productsWithCorrectPriceSelector(
            state => state.products.activeProduct,
            state
        ),
    }
}



export default compose(
    withSetCorrectCategory,
    connect(
        mapStateToProps, 
        {
            fetchProduct, 
            activeAtributeChanged, 
            cartProductAdded
        }
    ),
)(SingleItemPage)
