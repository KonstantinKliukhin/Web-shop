import { createSlice } from "@reduxjs/toolkit";

import {getProductById} from "../opus/queries/productsQueries";

const initialState = {
    productLoadingStatus: 'idle',
    activeProduct: {},
}

export const fetchProduct = (id) => {
    return {
        type: 'activeProduct/fetchProduct',
        payload: getProductById(id),
    }
}

const productSlice = createSlice({
    name: 'activeProduct',
    initialState,
    reducers: {
        activeAtributeChanged: (state, action) => {
            const attributeIndex = state.activeProduct.attributes.findIndex((attribute) => {
                return attribute.id === action.payload.id;
            })
            state.activeProduct.attributes[attributeIndex].selectedItem = action.payload.selectedItem
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase('activeProduct/fetchProduct/pending', state => {state.productLoadingStatus = 'loading'})
            .addCase('activeProduct/fetchProduct/fulfilled', (state, action) => {
                state.productLoadingStatus = 'confirmed';
                state.activeProduct = action.payload.product;
            })
            .addCase('activeProduct/fetchProduct/rejected', (state, action) => {
                console.error(action)
                state.productLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
})

const { reducer, actions } = productSlice;

export const { activeAtributeChanged } = actions;

export default reducer;
