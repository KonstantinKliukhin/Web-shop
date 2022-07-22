import { Query } from '@tilework/opus';

function getCurrencyQueries() {
    const getAllCurrencies = () => {
        return new Query('currencies')
            .addFieldList(['symbol', 'label'])
            .addCalculatedField('id', (res) => res.id = res.symbol + res.label)
    }

    return {
        getAllCurrencies
    }
}

export default getCurrencyQueries;