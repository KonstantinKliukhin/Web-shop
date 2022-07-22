import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

import {fetchProductsByCategory, fetchProductById} from '../services';


const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState({
    productsLoadingStatus: 'idle',
    productLoadingStatus: 'idle',
    activeProduct: {},
})

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (categoryName) => {
        return await fetchProductsByCategory(categoryName);
    }
)

export const fetchProduct = createAsyncThunk(
    'products/fetchProduct',
    async (id) => {
        return await fetchProductById(id);
    }
)



const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, state => {state.productsLoadingStatus = 'loading'})
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.productsLoadingStatus = 'confirmed';
                productsAdapter.setAll(state, action.payload.category)
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                console.log(action)
                state.productsLoadingStatus = 'error';
            })
            .addCase(fetchProduct.pending, state => {state.productLoadingStatus = 'loading'})
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.productLoadingStatus = 'confirmed';
                state.activeProduct = action.payload.product;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                console.log(action)
                state.productLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
})


const { reducer} = productSlice;

export const {selectAll : selectAllProducts} = productsAdapter.getSelectors(state => state.products);


export default reducer;