import {configureStore} from '@reduxjs/toolkit';
import categories from '../slices/categoriesSlice';
import products from '../slices/productsSlice';
import currencies from '../slices/currencieSlice';
import cart from '../slices/cartSlice';
// import client from '../services/opusClientConfig';
// export const fetchMiddleware = storeAPI => next => action => {
//     if (action?.payload?.type === 'query') {
//       (async function fetchData() {
//         const result = await client.post(action.payload);

//         if (result?.errors?.length) {
//             throw new Error(result.errors)
//         }

//         console.log(result)
  
//         return next({type: action.type, payload: result});
        
//       })()
//     }
  
//     return next(action)
//   }


const store = configureStore({
    reducer: {categories, products, currencies, cart},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;