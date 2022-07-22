import {Component} from 'react';

import ItemAtribute from '../itemAtribute/ItemAtribute';

import './itemDescription.scss';

class ItemDescription extends Component {
    
    render() {
        const {priceDown, price, name, brand} = this.props;
        return (
            <div className="item__description">
            <h3 className="item__description__brand">
                {brand}
            </h3>
            <h4 className="item__description__title">{name}</h4>
            {priceDown || <p className="item__description__price">{`${price.currency.symbol}${price.amount}`}</p>}
            <ItemAtribute 
                selectedItem = {{
                    value: 's',
                    label: 's',
                }}
                color
                name='Color:' 
                list={[
                    {
                        value: 'xs',
                        label: 'xs',
                    },
                    {
                        value: 's',
                        label: 's',
                    },
                    {
                        value: 'm',
                        label: 'm',
                    },
                    {
                        value: 'l',
                        label: 'l',
                    },
                    {
                        value: 'xl',
                        label: 'xl',
                    },
                    {
                        value: 'xxl',
                        label: 'xxl',
                    }
                ]}/>
                <ItemAtribute 
                selectedItem = {{
                    value: 's',
                    label: 's',
                }}
                name='Size:' 
                list={[
                    {
                        value: 'xs',
                        label: 'xs',
                    },
                    {
                        value: 's',
                        label: 's',
                    },
                    {
                        value: 'm',
                        label: 'm',
                    },
                    {
                        value: 'l',
                        label: 'l',
                    },
                    {
                        value: 'xl',
                        label: 'xl',
                    },
                    {
                        value: 'xxl',
                        label: 'xxl',
                    }
                ]}/>
            {priceDown && (
                <div className="item__description__price-calc">
                    <p className="item__description__price-calc__title">
                        PRICE:
                    </p>
                    <p className="item__description__price">
                        {`${price.currency.symbol}${price.amount}`}
                    </p>
                </div>
            )}
        </div>
        )
    }
}

export default ItemDescription;