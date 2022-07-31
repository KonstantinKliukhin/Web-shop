import { createSlice } from "@reduxjs/toolkit";

import { getCategoriesNamesQuery } from "../opus/queries/categoriesQueries";


export const initialState = {
    activeCategory: '',
    categoriesLoadingStatus: 'idle',
    categories: []
}

export const fetchCategories = () => {
    return {
        type: 'categories/fetchCategories',
        payload: getCategoriesNamesQuery(),
    }
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        activeCategoryChanged: (state, action) => {
            state.activeCategory = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase('categories/fetchCategories/pending', state => {state.categoriesLoadingStatus = 'loading'})
            .addCase('categories/fetchCategories/fulfilled', (state, action) => {
                state.categoriesLoadingStatus = 'confirmed';
                state.categories = action.payload.categories;
            })
            .addCase('categories/fetchCategories/rejected', (state, action) => {
                console.error(action)
                state.categoriesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
})


const {actions, reducer} = categoriesSlice;

export const {
    activeCategoryChanged,
} = actions;

export default reducer;

