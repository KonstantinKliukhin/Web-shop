import { Field, Query } from '@tilework/opus';


export const getProductsByCategoryQuery = (categoryTitle) => {
    return new Query('category')
        .addArgument('input', 'CategoryInput', {'title': categoryTitle})
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
        .addTransformation(res => {
            if (res?.products?.length > 9) {
                return res.products.slice(0, 9)
            } else {
                return res.products
            }
        })
}

export const getProductById = (id) => {
    return new Query('product')
        .addArgument('id','String!', id)
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




