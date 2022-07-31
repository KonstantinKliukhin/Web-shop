import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import {getProductsByCategoryQuery } from "../opus/queries/productsQueries";


const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState({
    productsLoadingStatus: 'idle',
    activeProduct: {},
})

export const fetchProducts = (categoryName) => {
    return {
        type: 'products/fetchProducts',
        payload: getProductsByCategoryQuery(categoryName),
    }
}


const productSlice = createSlice({
    name: 'products',
    initialState,
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
    }
})


const { reducer } = productSlice;


export const {selectAll : selectAllProducts} = productsAdapter.getSelectors(state => state.products);


export default reducer;