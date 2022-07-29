import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import {getProductsByCategoryQuery, getProductById} from "../services/queries/productsQueries";


const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState({
    productsLoadingStatus: 'idle',
    productLoadingStatus: 'idle',
    activeProduct: {},
})

export const fetchProducts = (categoryName) => {
    return {
        type: 'products/fetchProducts',
        payload: getProductsByCategoryQuery(categoryName),
    }
}

export const fetchProduct = (id) => {
    return {
        type: 'products/fetchProduct',
        payload: getProductById(id),
    }
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        activeAtributeChanged: (state, action) => {
            const attributeIndex = state.activeProduct.attributes.findIndex((attribute) => {
                return attribute.id === action.payload.id;
            })
            state.activeProduct.attributes[attributeIndex].selectedItem = action.payload.selectedItem
        },
        FetchProducts: (state) => {
            state.productsLoadingStatus = 'loading'
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase('products/fetchProducts/pending', state => {
                state.productsLoadingStatus = 'loading'
            })
            .addCase('products/fetchProducts/fulfilled', (state, action) => {
                state.productsLoadingStatus = 'confirmed';

                productsAdapter.setAll(state, action.payload.category)
            })
            .addCase('products/fetchProducts/rejected', (state, action) => {
                console.error(action)
                state.productsLoadingStatus = 'error';
            })
            .addCase('products/fetchProduct/pending', state => {state.productLoadingStatus = 'loading'})
            .addCase('products/fetchProduct/fulfilled', (state, action) => {
                state.productLoadingStatus = 'confirmed';
                state.activeProduct = action.payload.product;
            })
            .addCase('products/fetchProduct/rejected', (state, action) => {
                console.error(action)
                state.productLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
})


const { reducer, actions} = productSlice;

export const {activeAtributeChanged, FetchingAllProductsStarted} = actions;

export const {selectAll : selectAllProducts} = productsAdapter.getSelectors(state => state.products);


export default reducer;