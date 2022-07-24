import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

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
});

const changeProductsPrice = (state, product, difference) => {
    if (Object.keys(state.entities).length) {
        product.prices.forEach(price => {
            const currentIndex = state.cartTotalPrice.findIndex((totalPrice) => {
                return  totalPrice.currency.id === price.currency.id;
             })

            const oldPrice = state.cartTotalPrice[currentIndex].amount;
            
            const newPrice = oldPrice + price.amount * difference;

            state.cartTotalPrice[currentIndex].amount = parseFloat(newPrice.toFixed(2));
        });
    } else if (difference > 0) {
        state.cartTotalPrice = product.prices;
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

            changeProductsPrice(state, action.payload, 1);

            if(state.ids.includes(cartProductId)) {
                changeProductCount(state, cartProductId, cartAdapter, 1)
            } else {
                cartAdapter.addOne(state, {...action.payload, count: 1})

                state.cartQuantity = state.cartQuantity + 1;
            }
        },
        cartProductCountIncreased: (state, action) => {
            const cartProductId = getCartIdbyProductId(action.payload)
            
            changeProductsPrice(state, action.payload, 1)
            changeProductCount(state, cartProductId, cartAdapter, 1)
        },
        cartProductCountDecreased: (state, action) => {
            const cartProductId = getCartIdbyProductId(action.payload)
            
            changeProductsPrice(state, action.payload, -1)
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