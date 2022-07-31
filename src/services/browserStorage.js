import { initialState as categoriesItialState } from "../slices/categoriesSlice";
import { initialState as currenciesInitialState } from "../slices/currencieSlice";

import { REDUX_LOCALSTORAGE_KEY } from "../data/locaStorageKeys";


export function loadState() {
    try {
        const serializedState = localStorage.getItem(REDUX_LOCALSTORAGE_KEY);

        if (!serializedState) return undefined

        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
}

export async function saveState(state) {
    try {
        const serializedState = JSON.stringify({
            cart: state.cart,
            currencies: {
                ...currenciesInitialState,
                activeCurrency: state.currencies.activeCurrency,
            },
            categories: {
                ...categoriesItialState,
                activeCategory: state.categories?.activeCategory,
            },
        });

        localStorage.setItem(REDUX_LOCALSTORAGE_KEY, serializedState);
    } catch (e) {
        console.error(e)
    }
}