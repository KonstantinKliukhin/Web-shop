import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const getUnicId = (product) => {
    return product.id + product.attributes.reduce((prevAttr, currentAttr) => {
        return prevAttr + currentAttr.selectedItem.id
    }, '')
}

const cartAdapter = createEntityAdapter({
    selectId: getUnicId
});

const initialState = cartAdapter.getInitialState({
    itemsCount: 0,
});

const categoriesSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        productAdded: (state, action) => {
            if (state.ids.includes(getUnicId(action.payload))) {
                console.log(action.payload.id)
                cartAdapter.updateOne({id: getUnicId(action.payload), changes: {...action.payload, count: state.entities.count ? state.entities.count + 1 : 1}}, state)
            }
            cartAdapter.addOne(state, action.payload)
        },
        productCountChanged: cartAdapter.updateOne
    },
})


const {actions, reducer} = categoriesSlice;

export const {selectAll : selectAllProducts} = cartAdapter.getSelectors(state => state.cart);

export const {
    productAdded,
    productCountChanged,
} = actions;

export default reducer;