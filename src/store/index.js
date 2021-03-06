import { configureStore } from '@reduxjs/toolkit';

import { loadState } from '../services/browserStorage';
import { saveState } from '../services/browserStorage';
import debounce from '../utils/debounce';

import { fetchMiddleware } from '../middleware/getApi';

import categories from '../slices/categoriesSlice';
import products from '../slices/productsSlice';
import activeProduct from '../slices/activeProductSlice';
import currencies from '../slices/currencieSlice';
import cart from '../slices/cartSlice';


const store = configureStore({
    reducer: {categories, products, activeProduct, currencies, cart},
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({serializableCheck: false}).concat(fetchMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: loadState(),
})

store.subscribe(
    debounce(() => {
        saveState(store.getState())
    }, 800)
  )

export default store;