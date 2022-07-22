import { Component } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';


import './itemAtribute.scss';


class ItemAtribute extends Component {

    selectItem = (item) => {
        const {attribute: {selectedItem, id}, onSelectAttribute} = this.props;

        if (selectedItem?.id !== item.id) {
            onSelectAttribute({selectedItem: item, id})
        }
    }


    ItemList = () => {
        const { attribute, style, onSelectAttribute } = this.props;
        const { items, type, selectedItem } = attribute;

        const selectedItemId = selectedItem?.id;

        if (items.length) {
            return (
                items.map((item) => {
                    const selected = item.id === selectedItemId;
                    const isColor = type === 'swatch';
                    let onSelect;

                    if (onSelectAttribute) {
                        onSelect = () => this.selectItem(item);
                    }

                    const itemClass = classNames({
                        'attribute-block__item': !isColor,
                        'attribute-block__item-color': isColor,
                        'attribute-block__item-color-white': item.displayValue === 'White',
                        'active': selected,
                    })

                    const calculatedAttrs = () => {
                        if (isColor) {
                            return {
                                'aria-label': item.displayValue,
                                'style': {
                                    ...style.item, 
                                    background: item.value,
                                }
                            }
                        }
                        
                        return {
                            'aria-labelledby': item.displayValue,
                            'style': style.item,
                        }
                    }

                    return (
                        <li 
                            key={item.id} 
                            className={itemClass}
                            onClick={onSelect}
                            {...calculatedAttrs()}>
                            {isColor ? null: item.value}
                        </li>
                    )
                })
            )
        }
    }

    render() {
        const { attribute: {name}, style } = this.props;
        const { block, title, items } = style;
        return (
            <div style={block} className="attribute-block">
                <p style={title} className="attribute-block__title">
                    {name}:
                </p>
                <ul style={items} className="attribute-block__list">
                    {this.ItemList()}
                </ul>
            </div>
        )
    }
}

ItemAtribute.defaultProps = {
    style: {},
    id: '',
}

ItemAtribute.propTypes = {
    style: PropTypes.shape({
        block: PropTypes.objectOf(PropTypes.string),
        title:PropTypes.objectOf(PropTypes.string),
        items: PropTypes.objectOf(PropTypes.string),
        item: PropTypes.objectOf(PropTypes.string),
        selectedItem: PropTypes.objectOf(PropTypes.string),
      }),

    onSelectAttribute: PropTypes.func,

    attribute: PropTypes.shape({
       items: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,
            displayValue: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,
        })).isRequired,

        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,

        name: PropTypes.string,
    }) 
}

export default ItemAtribute;
