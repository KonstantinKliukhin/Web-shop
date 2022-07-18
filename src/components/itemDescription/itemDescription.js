import {Component} from 'react';

import ItemAtribute from '../itemAtribute/ItemAtribute';

import './itemDescription.scss';

class ItemDescription extends Component {
    
    render() {
        return (
            <div className="item__description">
            <h3 className="item__description__brand">
                Apollo 
            </h3>
            <h4 className="item__description__title">Running Short</h4>
            {this.props.priceDown || <p className="item__description__price">$50.00</p>}
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
            {this.props.priceDown && (
                <div className="item__description__price-calc">
                    <p className="item__description__price-calc__title">
                        PRICE:
                    </p>
                    <p className="item__description__price">$50.00</p>
                </div>
            )}
        </div>
        )
    }
}

export default ItemDescription;