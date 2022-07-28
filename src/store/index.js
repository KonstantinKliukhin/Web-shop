import {configureStore} from '@reduxjs/toolkit';

import { loadState } from '../services/browserStorage';

import { fetchMiddleware } from '../middleware/getApi';

import categories from '../slices/categoriesSlice';
import products from '../slices/productsSlice';
import currencies from '../slices/currencieSlice';
import cart from '../slices/cartSlice';


const store = configureStore({
    reducer: {categories, products, currencies, cart},
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({serializableCheck: false}).concat(fetchMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: loadState(),
})

export default store;