import {arrayOf, string, number, shape, bool} from 'prop-types';
import { currencyType } from './currenciesTypes';

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

export const attributesType = arrayOf(attributeType);

export const priceType = shape({
    amount: number.isRequired,
    currency: currencyType.isRequired,
});

export const pricesType = arrayOf(priceType);

export const productType = shape({
    id: string,
    name: string,
    brand: string,
    inStock: bool,
    description: string,
    category: string,
    gallery: arrayOf(string),
    attributes: attributesType,
    price: priceType,
    prices: pricesType,
});

export const listProductType = shape({
    id: string.isRequired,
    name: string.isRequired,
    brand: string.isRequired,
    inStock: bool.isRequired,
    gallery: arrayOf(string).isRequired,
    attributes: attributesType.isRequired,
    price: priceType,
    prices: pricesType.isRequired,
});

export const listProductsType = arrayOf(listProductType);

export const cartProductType = shape({
    id: string.isRequired,
    name: string.isRequired,
    brand: string.isRequired,
    gallery: arrayOf(string).isRequired,
    count: number.isRequired,
    attributes: attributesType.isRequired,
    price: priceType,
    prices: pricesType.isRequired,
});