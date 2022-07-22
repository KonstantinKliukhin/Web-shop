import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

import {fetchAllCurrencies} from '../services'


const currenciesAdapter = createEntityAdapter();

const initialState = currenciesAdapter.getInitialState({
    activeCurrency: null,
    currenciesLoadingStatus: 'idle',
})

export const fetchCurrencies = createAsyncThunk(
    'currency/fetchCurrencies',
    async () => {
        return await fetchAllCurrencies();
    }
)

const currenciesSlice = createSlice({
    name: 'currencies',
    initialState,
    reducers: {
        activeCurrencyChanged: (state, action) => {
            state.activeCurrency = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrencies.pending, state => {
                state.currenciesLoadingStatus = 'loading'
            })
            .addCase(fetchCurrencies.fulfilled, (state, action) => {
                state.currenciesLoadingStatus = 'confirmed';
                currenciesAdapter.setAll(state, action.payload.currencies)
            })
            .addCase(fetchCurrencies.rejected, (state, action) => {
                console.log(action)
                state.currenciesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
})


const {actions, reducer} = currenciesSlice;

export const {selectAll : selectAllcurrencies} = currenciesAdapter.getSelectors(state => state.currencies);

export const {
    activeCurrencyChanged,
} = actions;

export default reducer;