import { Field, Query } from '@tilework/opus';

function getProductsQueries() {
    const getProductsByCategoryQuery = (categoryTitle) => {
        return new Query('category')
            .addArgument('input', 'CategoryInput', {'title': categoryTitle[0]})
            .addTransformation(res => res.products)
            .addField(new Field('products', true)
                .addFieldList(['id', 'name', 'brand', 'inStock', 'gallery'])
                .addField(new Field('prices', true)
                    .addField('amount')
                    .addField(new Field('currency')
                        .addFieldList(['symbol', 'label'])
                        .addCalculatedField('id', (res) => res.symbol + res.label)
                    )
                )
                .addField(new Field('attributes', true)
                    .addFieldList(['name', 'type', 'id'])
                    .addField(new Field('items', true)
                        .addFieldList(['id', 'displayValue', 'value'])
                    )
                    .addCalculatedField('selectedItem', (res) => res?.items[1])
                )
            )
    }

    const getProductById = (id) => {
        return new Query('product')
            .addArgument('id','String!', id[0])
            .addFieldList(['id', 'name', 'brand', 'inStock', 'gallery', 'description', 'category'])
            .addField(new Field('prices', true)
                .addField('amount')
                .addField(new Field('currency')
                    .addFieldList(['symbol', 'label'])
                    .addCalculatedField('id', (res) => res.symbol + res.label)
                )
            )
            .addField(new Field('attributes', true)
                .addFieldList(['name', 'type', 'id'])
                .addField(new Field('items', true)
                    .addFieldList(['id', 'displayValue', 'value'])
                )
                .addCalculatedField('selectedItem', (res) => res?.items[1])
            )
    }

    return {
        getProductsByCategoryQuery,
        getProductById,
    }
}

export default getProductsQueries;

