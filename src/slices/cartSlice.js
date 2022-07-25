import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import {TAX_INDEX} from '../data/buisnessConstants';

const getCartIdbyProductId = (product) => {
    if (product?.attributes) {
        return product.id + product.attributes.reduce((acc, currentAttr) => {
            return acc + '-' + currentAttr.selectedItem.id.toLowerCase()
        }, '')
    }
}

const cartAdapter = createEntityAdapter({
    selectId: getCartIdbyProductId
});

const initialState = cartAdapter.getInitialState({
    cartQuantity: 0,
    cartTotalPrice: [],
    cartTaxPrice: 0,
});

const changeCartPrices = (state, product, difference) => {
    if (Object.keys(state.entities).length) {
        product.prices.forEach(price => {
            const currentTotalIndex = state.cartTotalPrice.findIndex((totalPrice) => {
                return  totalPrice.currency.id === price.currency.id;
             })

            const currentTaxIndex = state.cartTaxPrice.findIndex((totalPrice) => {
                return  totalPrice.currency.id === price.currency.id;
             })

            const oldTotalPrice = state.cartTotalPrice[currentTotalIndex].amount;
            
            const newTotalPrice = parseFloat((oldTotalPrice + price.amount * difference).toFixed(2));
            console.log(newTotalPrice)

            state.cartTaxPrice[currentTaxIndex].amount = parseFloat((newTotalPrice * TAX_INDEX).toFixed(2));

            state.cartTotalPrice[currentTotalIndex].amount = newTotalPrice;
        });
    } else if (difference > 0) {
        state.cartTotalPrice = product.prices;

        state.cartTaxPrice = product.prices.map((price) => ({
            ...price,
            amount: parseFloat((price.amount * TAX_INDEX).toFixed(2))
        }))
    }
}

const changeProductCount = (state, id, adapter, difference) => {

    state.cartQuantity += difference;

    const newProductCount = state.entities[id].count + difference;

    if (newProductCount > 0) {
        adapter.updateOne(state, {id, changes: {count: newProductCount}})
    } else {
        adapter.removeOne(state, id)
    }
}

const categoriesSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        cartProductAdded: (state, action) => {

            const cartProductId = getCartIdbyProductId(action.payload)

            changeCartPrices(state, action.payload, 1);

            if(state.ids.includes(cartProductId)) {
                changeProductCount(state, cartProductId, cartAdapter, 1)
            } else {
                cartAdapter.addOne(state, {...action.payload, count: 1})

                state.cartQuantity = state.cartQuantity + 1;
            }
        },
        cartProductCountIncreased: (state, action) => {
            const cartProductId = getCartIdbyProductId(action.payload)
            
            changeCartPrices(state, action.payload, 1)
            changeProductCount(state, cartProductId, cartAdapter, 1)
        },
        cartProductCountDecreased: (state, action) => {
            const cartProductId = getCartIdbyProductId(action.payload)
            
            changeCartPrices(state, action.payload, -1)
            changeProductCount(state, cartProductId, cartAdapter, -1)
        }
            
    },
})


const {actions, reducer} = categoriesSlice;

export const {
    selectAll : selectAllCartProducts, 
    selectIds: selectCartProductsIds,
} = cartAdapter.getSelectors(state => state.cart);

export const {
    cartProductAdded,
    cartProductCountIncreased,
    cartProductCountDecreased,
} = actions;

export default reducer;