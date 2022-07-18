import { Component } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';


import './itemAtribute.scss';


class ItemAtribute extends Component {

    selectItem = (value) => {
        const {selectedItem, onChange, name} = this.props;

        if (selectedItem?.value !== value) {
            onChange(value, name)
        }
    }


    ItemList = () => {
        const {list, color} = this.props;

        const selectedItemValue = this.props.selectedItem?.value;


        if (list.length) {
            return (
                list.map((item) => {
                    const selected = item.value === selectedItemValue;

                    const itemClass = classNames({
                        [`attribute-block__item${color ? '-color': ''}`]: true,
                        'active': selected,
                    })

                    return (
                        <li key={item.value} className={itemClass}>{color ? null: item.label}</li>
                    )
                })
            )
        }
    }

    render() {
        const {name, style} = this.props;
        const {block, title, list} = style;

        return (

            <div style={block} className="attribute-block">
                <p style={title} className="attribute-block__title">
                    {name}
                </p>
                <ul style={list} className="attribute-block__list">
                    {this.ItemList()}
                </ul>
            </div>
        )
    }
}

ItemAtribute.defaultProps = {
    style: {},
    name: '',
}

ItemAtribute.propTypes = {
    name: PropTypes.string,
    color: PropTypes.bool,
    style: PropTypes.shape({
        block: PropTypes.objectOf(PropTypes.string),
        title:PropTypes.objectOf(PropTypes.string),
        list: PropTypes.objectOf(PropTypes.string),
        item: PropTypes.objectOf(PropTypes.string),
        selectedItem: PropTypes.objectOf(PropTypes.string),
      }),
    onChange: PropTypes.func.isRequired,

    list: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    })).isRequired,
}

export default ItemAtribute;
