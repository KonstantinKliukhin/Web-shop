import { Component } from "react";


import { func, string } from "prop-types";
import { productType } from "../../types/productTypes";

import setContent from "../../utils/setContent";

import { connect } from "react-redux";
import { compose } from "@reduxjs/toolkit";

import { fetchProduct, activeAtributeChanged} from "../../slices/productsSlice";
import { cartProductAdded } from "../../slices/cartSlice";

import {productsWithCorrectPriceSelector} from "../../selectors/productWithCorrectPrice";

import Page404 from "../404/404";
import Spinner from "../../components/spinner/Spinner";

import SingleItemLayout from "./SingleItemLayout";

import withSetCorrectCategory from "../../components/HOC/withSetCorrectCategory";

import './singleItemPage.scss';


class SingleItemPage extends Component {
    componentDidMount() {
        const {fetchProduct, id} = this.props;
        fetchProduct(id);
    }

    render() {
        const { 
            product, 
            productLoadingStatus, 
            activeAtributeChanged, 
            cartProductAdded,
            activeCategory,
        } = this.props;

        if (
            product?.category && 
            product?.category !== activeCategory && 
            activeCategory !== 'all'
           ) {
            return <Page404/>
        }

        const content = setContent(
            [productLoadingStatus], 
            (props) => <SingleItemLayout {...props}/>,
            {
                product,
                activeAtributeChanged,
                cartProductAdded,
            }, 
            Spinner, 
            Page404
        )

        return (
            <>
                {content}
            </>
        )
    }
}

SingleItemPage.propTypes = {
    fetchProduct: func.isRequired,
    id: string.isRequired,
    productLoadingStatus: string.isRequired,
    activeAtributeChanged: func.isRequired,
    cartProductAdded: func.isRequired,
    activeCategory: string.isRequired,
    product: productType,
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
