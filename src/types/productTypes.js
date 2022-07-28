import {arrayOf, string, number, shape} from 'prop-types';

export const attributeItemType = shape({
    id: string.isRequired,
    value: string.isRequired,
    displayValue: string.isRequired,
});

export const attributeType = shape({
    id: string.isRequired,
    name: string.isRequired,
    type: string.isRequired,
    items: arrayOf(attributeItemType).isRequired,
    selectedItem: attributeItemType.isRequired,
});

export const attributesType = arrayOf(attributeType)

export const currencyType = shape({
    id: string.isRequired,
    label: string.isRequired,
    symbol: string.isRequired,
})

export const priceType = shape({
    amount: number.isRequired,
    currency: currencyType.isRequired,
});

export const pricesType = arrayOf(priceType);

export const cartProductType = shape({
    id: string.isRequired,
    name: string.isRequired,
    brand: string.isRequired,
    gallery: arrayOf(string).isRequired,
    count: number.isRequired,
    attributes: attributesType.isRequired,
    price: priceType,
    prices: pricesType.isRequired,
})