import { createSelector } from "@reduxjs/toolkit"


const toCorrectPriceSelector = (prices, activeCurrency) => {
  return (
    prices?.filter((price) => {
      return price.currency.id === activeCurrency.id
    })[0]
  )
}

const productsWithCorrectPriceSelector = (productSelector, state) => {
  return createSelector(
      (state) => state.currencies.activeCurrency,
      productSelector,
      (activeCurrency, products) => {

        if (!Object.keys(products).length) {
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

export  {productsWithCorrectPriceSelector, toCorrectPriceSelector};



