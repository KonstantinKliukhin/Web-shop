import {configureStore} from '@reduxjs/toolkit';

import categories from '../slices/categoriesSlice';
import products from '../slices/productsSlice';
import currencies from '../slices/currencieSlice';
import cart from '../slices/cartSlice';

import { loadState } from '../services/browserStorage';

import client from '../services/opusClientConfig';

export const fetchMiddleware = () => next => action => {
    if (action?.payload?.type === 'query') {
        next({
            type: `${action.type}/pending`,
            payload: null,
        });

        return (async function fetchData() {
            try {
                const result = await client.post(action.payload); 

                if (result?.errors?.length || 
                    Object.values(result).every(elem => elem === null)) {
                    throw new Error(result?.errors)
                }

                return next({
                    type: `${action.type}/fulfilled`, 
                    payload: result,
                });
            } catch(error) {
                console.error(error)

                return next({
                    type: `${action.type}/rejected`,
                    payload: error,
                })
            }
        })()
    }
    return next(action)
}


const store = configureStore({
    reducer: {categories, products, currencies, cart},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(fetchMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: loadState(),
})

export default store;