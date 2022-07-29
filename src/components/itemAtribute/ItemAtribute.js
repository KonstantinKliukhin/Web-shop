import { Component } from 'react';

import { 
    shape, 
    objectOf, 
    bool, 
    func, 
    string, 
} from 'prop-types';
import { attributeType } from '../../types/productTypes';

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
        const { 
            attribute, 
            style, 
            onSelectAttribute, 
            seletionIsDisabled, 
            disabled
        } = this.props;

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
                        'attribute-block__item-color-white': item?.displayValue === 'White',
                        'active': selected && !disabled,
                        'selection-disabled': seletionIsDisabled,
                        'disabled': disabled,
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
                            role='radio'
                            aria-checked={selected}
                            onClick={onSelect}
                            onKeyDown={(e) => {
                                if (e.code === 'Enter' || e.code === 'Space') {
                                    onSelect(e)
                                }
                            }}
                            {...calculatedAttrs()}
                            tabIndex={seletionIsDisabled ? '' : 0}
                        >
                            {isColor ? null: item.value}
                        </li>
                    )
                })
            )
        }
    }

    render() {
        const { attribute, style } = this.props;
        const { block, title, items } = style;
        return (
            <div style={block} className="attribute-block">
                <p style={title} className="attribute-block__title">
                    {attribute?.name}:
                </p>
                <ul 
                    role='radiogroup' 
                    style={items} 
                    className="attribute-block__list"
                >
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
    style: shape({
        block: objectOf(string),
        title:objectOf(string),
        items: objectOf(string),
        item: objectOf(string),
        selectedItem: objectOf(string),
    }),
    onSelectAttribute: func,
    disabled: bool,
    selectionIsDisabled: bool,
    attribute: attributeType,
}

export default ItemAtribute;
