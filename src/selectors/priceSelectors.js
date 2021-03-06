import { createSelector } from "@reduxjs/toolkit"


export const toCorrectPriceSelector = (prices, activeCurrency) => {
    let isCorrectPrices;

    if (prices?.length) {
        isCorrectPrices = prices?.some((price) => {
            return price?.currency?.id != null && typeof price?.amount === 'number'
        })
    } else {
        return null
    }
  
    if (activeCurrency && isCorrectPrices) {
        return (
            prices?.find((price) => {
                return price.currency.id === activeCurrency.id
            })
        )
    } else {
        return null;
    }
}

export const productsWithCorrectPriceSelector = (productSelector, state) => {
    return createSelector(
        (state) => state.currencies.activeCurrency,
        productSelector,
        (activeCurrency, products) => {
            if (!Object.keys(products).length || !activeCurrency) {
                return products
            } 

            if (Array.isArray(products)) {
                return products.map((product) => {
                    return {
                        ...product,
                        price: toCorrectPriceSelector(product?.prices, activeCurrency)
                    }
                })
            } 

            if (Object.getPrototypeOf(products) === Object.prototype) {
                return {
                    ...products,
                    price: toCorrectPriceSelector(products?.prices, activeCurrency)
                }
            }
        }
  )(state)
}