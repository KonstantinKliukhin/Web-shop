import { createSelector } from "@reduxjs/toolkit"

const productsWithCorrectPriceSelector = (productSelector, state) => {
    return createSelector(
        (state) => state.currencies.activeCurrency,
        productSelector,
        (activeCurrency, products) => {
          const toCorrectPrice = (product) => {
            return {
              ...product,
              price: product?.prices?.filter((price) => {
                return price.currency.id === activeCurrency.id
              })[0]
            }
          }

          if (!Object.keys(products).length) {
            return products
          } 

          if (Array.isArray(products)) {
            return products.map(toCorrectPrice)
          } 

          if (Object.getPrototypeOf(products) === Object.prototype) {
            return toCorrectPrice(products)
          }
        }
    )(state)
}

export default productsWithCorrectPriceSelector;
