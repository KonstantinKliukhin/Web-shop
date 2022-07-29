import {Component} from 'react';

import { bool, func, string } from 'prop-types';
import { priceType, attributesType } from '../../types/productTypes';

import ItemAtribute from '../itemAtribute/ItemAtribute';

import './itemDescription.scss';

class ItemDescription extends Component {
    getAttributes = () => {
        const {
            attributes, 
            onSelectAtttribute, 
            attributesIsDisabled, 
            attributesSelectionIsDisabled 
        } = this.props;

        return attributes?.map(attribute => {
            return (
                <ItemAtribute 
                    key={attribute.id} 
                    attribute={attribute}
                    onSelectAttribute={onSelectAtttribute}
                    disabled={attributesIsDisabled}
                    seletionIsDisabled={attributesSelectionIsDisabled}
                />
            )
        })
    }
    
    render() {
        const { priceDown, price, name, brand, } = this.props;

        return (
            <div className="item__description">
            <h3 className="item__description__brand">
                {brand}
            </h3>
            <h4 className="item__description__title">{name}</h4>
            {priceDown || 
                <p className="item__description__price">
                    {`${price?.currency?.symbol}${price?.amount}`}
                </p>
            }
            {this.getAttributes()}
            {priceDown && (
                <div className="item__description__price-calc">
                    <p className="item__description__price-calc__title">
                        PRICE:
                    </p>
                    <p className="item__description__price">
                        {price ? 
                            `${price.currency?.symbol}${price.amount}` : 
                            'No information about price'}
                    </p>
                </div>
            )}
        </div>
        )
    }
}

ItemDescription.propTypes = {
    onSelectAttribute: func,
    priceDown: bool,
    name: string.isRequired,
    brand: string.isRequired,
    disabled: bool,
    seletionIsDisabled: bool,
    price: priceType.isRequired,
    attributes: attributesType,
}

export default ItemDescription;