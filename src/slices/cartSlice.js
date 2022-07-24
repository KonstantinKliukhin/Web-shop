import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const getCartIdbyProductId = (product) => {
    return product.id + product.attributes.reduce((acc, currentAttr) => {
        return acc + '-' + currentAttr.selectedItem.id.toLowerCase()
    }, '')
}

const cartAdapter = createEntityAdapter({
    selectId: getCartIdbyProductId
});

const initialState = cartAdapter.getInitialState({
    cartQuantity: 0,
    cartTotalPrice: [],
});



const categoriesSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        productAdded: (state, action) => {
            state.cartQuantity = state.cartQuantity + 1;

            const cartProductId = getCartIdbyProductId(action.payload)

            if(state.ids.includes(cartProductId)) {
                const productCount = state.entities[cartProductId].count + 1

                cartAdapter.updateOne(state, {id: getCartIdbyProductId(action.payload), changes: {count: productCount}})

                action.payload.prices.forEach(price => {
                    const currentIndex = state.cartTotalPrice.findIndex((totalPrice) => {
                        return  totalPrice.currency.id === price.currency.id
                     })
    
                    state.cartTotalPrice[currentIndex].amount += price.amount
                });
            } else {
                cartAdapter.addOne(state, {...action.payload, count: 1})
                state.cartTotalPrice = action.payload.prices
            }
        },

            
    },
})


const {actions, reducer} = categoriesSlice;

export const {selectAll : selectCartProducts, selectById: selectCartProductById} = cartAdapter.getSelectors(state => state.cart);

export const {
    productAdded,
} = actions;

export default reducer;