import { Query } from '@tilework/opus';

function getCategoriesQueries() {
    const getCategoriesNamesQuery = () => {
        return new Query('categories')
            .addField('name')
            .addCalculatedField('id', (res) => res.id = res.name);
    }

    return {
        getCategoriesNamesQuery
    }
}
export default getCategoriesQueries;