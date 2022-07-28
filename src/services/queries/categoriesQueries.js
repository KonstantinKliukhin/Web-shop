import { Query } from '@tilework/opus';


export const getCategoriesNamesQuery = () => {
    return new Query('categories')
        .addField('name')
        .addCalculatedField('id', (res) => res.id = res.name);
}