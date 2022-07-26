import client from './opusClientConfig';
import getCategoriesQueries from './queries/categoriesQueries';
import getProductsQueries from './queries/productsQueries';
import getCurrencyQueries from './queries/currencyQueries';

const { getCategoriesNamesQuery } = getCategoriesQueries();
const {getProductsByCategoryQuery, getProductById} = getProductsQueries();
const {getAllCurrencies} = getCurrencyQueries();

const fetchData = (getQuery) => (...args) => { 
    return  (async function() {
        const result = await client.post(getQuery(args));

        if (result?.errors?.length || Object.values(result).every(elem => elem === null)) {
            throw new Error(result.errors)
        }
    
        return result
    })()
}

export const { fetchCategoriesNames, fetchProductsByCategory, fetchAllCurrencies, fetchProductById } = {
    fetchCategoriesNames: fetchData(getCategoriesNamesQuery),
    fetchProductsByCategory: fetchData(getProductsByCategoryQuery),
    fetchAllCurrencies: fetchData(getAllCurrencies),
    fetchProductById: fetchData(getProductById)
}


