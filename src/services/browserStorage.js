import { initialState as categoriesItialState } from "../slices/categoriesSlice";
import { initialState as currenciesInitialState } from "../slices/currencieSlice";


const KEY = 'reduxStore';

export function loadState() {
    try {
        const serializedState = localStorage.getItem(KEY);

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

        localStorage.setItem(KEY, serializedState);
    } catch (e) {
        console.error(e)
    }
}