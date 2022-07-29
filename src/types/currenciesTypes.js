import { string, shape, arrayOf } from "prop-types";

export const currencyType = shape({
    id: string.isRequired,
    label: string.isRequired,
    symbol: string.isRequired,
});

export const currenciesType = arrayOf(currencyType);