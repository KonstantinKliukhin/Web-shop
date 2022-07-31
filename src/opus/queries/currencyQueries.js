import { Query } from '@tilework/opus';

export const getAllCurrencies = () => {
    return new Query('currencies')
        .addFieldList(['symbol', 'label'])
        .addCalculatedField('id', (res) => res.id = res.symbol + res.label)
}

