import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

import {fetchCategoriesNames} from '../services'


const categoriesAdapter = createEntityAdapter();

const initialState = categoriesAdapter.getInitialState({
    activeCategory: '',
    categoriesLoadingStatus: 'idle',
})

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        return await fetchCategoriesNames();
    }
)

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
            .addCase(fetchCategories.pending, state => {state.categoriesLoadingStatus = 'loading'})
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categoriesLoadingStatus = 'confirmed';
                categoriesAdapter.setAll(state, action.payload.categories)
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                console.log(action)
                state.categoriesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
})


const {actions, reducer} = categoriesSlice;

export const {selectAll : selectAllCategories} = categoriesAdapter.getSelectors(state => state.categories);

export const {
    activeCategoryChanged,
} = actions;

export default reducer;

