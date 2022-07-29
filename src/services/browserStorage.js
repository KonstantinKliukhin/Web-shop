const KEY = 'reduxStoreCart';

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
            currencies: state.currencies,
            categories: state.categories,
        });

        localStorage.setItem(KEY, serializedState);
    } catch (e) {
        console.error(e)
    }
}