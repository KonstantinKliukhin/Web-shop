import { createSlice } from "@reduxjs/toolkit";

import { getAllCurrencies } from "../opus/queries/currencyQueries";

export const initialState = {
    currenciesLoadingStatus: 'idle',
    currencies: [],
    activeCurrency: null,
}

export const fetchCurrencies = () => {
    return {
        type: 'currencies/fetchCurrencies',
        payload: getAllCurrencies(),
    }
}

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
            .addCase('currencies/fetchCurrencies/pending', state => {
                state.currenciesLoadingStatus = 'loading';
            })
            .addCase('currencies/fetchCurrencies/fulfilled', (state, action) => {
                state.currenciesLoadingStatus = 'confirmed';
                state.currencies = action.payload.currencies;
            })
            .addCase('currencies/fetchCurrencies/rejected', (state, action) => {
                console.error(action);
                state.currenciesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = currenciesSlice;

export const {
    activeCurrencyChanged,
} = actions;

export default reducer;