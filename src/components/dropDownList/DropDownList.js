import { Component } from "react";

import PropTypes from 'prop-types';
import classNames from 'classnames';

import './dropDownList.scss';

import arrowDown from '../../resources/img/arrow-down.svg';

class DropDownList extends Component {

    constructor(props) {
        super(props)

        const { title, list } = this.props;

        this.state = {
            isListOpen: false,
            title,
            selectedItem: null,
            list,
          };
    }

    componentDidMount() {
        const { select } = this.props;
    
        if (select) {
          this.selectSingleItem(select);
        }
    }

    componentDidUpdate() {
        const { isListOpen } = this.state;
    
        setTimeout(() => {
          if (isListOpen) {
            window.addEventListener('click', this.close);
          } else {
            window.removeEventListener('click', this.close);
          }
        }, 0);
    }
    
    componentWillUnmount() {
        window.removeEventListener('click', this.close);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { list } = nextProps;
    
        if (JSON.stringify(list) !== JSON.stringify(prevState.list)) {
          return { list };
        }
    
        return null;
    }

    selectItem = (item) => {
      const { value, activeTitle } = item;
      const { selectedItem } = this.state;
      const { name, onChange} = this.props;
  
      this.setState({
        title: activeTitle,
        isListOpen: false,
        selectedItem: item,
      }, () => selectedItem?.value !== value && onChange(item, name));
    }

    close = () => {
        this.setState({
          isListOpen: false,
        });
    }

    selectSingleItem = (item) => {
        const { list } = this.props;
    
        const selectedItem = list.find((i) => i.value === item.value);
        this.selectItem(selectedItem);
    }

    toggleList = () => {
        this.setState((prevState) => ({
          isListOpen: !prevState.isListOpen,
        }));
    }

    

    listItems = () => {
        const { id, styles} = this.props;

        const { list } = this.state;

        const selectedItemValue = this.state.selectedItem?.value;

        const { listItem, listItemNoResult, selectedItem } = styles;


        if (list.length) {

          return (
            list.map((item) => {
              const selected = item.value === selectedItemValue;
              const itemClass = classNames({
                'dropdown-list__item': true,
                [id]: true,
                'selected': selected,
              })
              return (
                <li
                  className={itemClass}
                  style = {selected ? {...selectedItem, ...listItem}: listItem}
                  key={item.value}
                  onClick={() => this.selectItem(item)}
                >
                  {item.label}
                </li>
              )
            })
          )
        };
          
        return (
            <div
              className={`dropdown-list__item no-result`}
              style={listItemNoResult}
            >
            </div>
          );
    }
    

    render() {

      const {id, styles, isArrow} = this.props;
      const { isListOpen, title } = this.state;
  
      const {
        wrapper,
        header,
        headerTitle,
        list,
        scrollList,
        arrow,
      } = styles;
  
      return (
        <div
          className={`dropdown-list__wrapper ${id}`}
          style={wrapper}
        >
          <button
            type="button"
            className={`dropdown-list__header ${id}`}
            style={header}
            onClick={this.toggleList}
          >
            <div
              className={`dropdown-list__header__title ${id}`}
              style={headerTitle}
            >
              {title} 
            </div>
            {isArrow && <img 
              src={arrowDown} 
              alt='arrow' 
              className="dropdown-list__header__arrow"
              style={isListOpen ? {...arrow, transform: 'rotate(180deg)'}: arrow}
              />}
          </button>
          {isListOpen && (
            <div
              className={`dropdown-list__list ${id}`}
              style={list}
            >
              <ul
                className={`dropdown-list__scroll-list ${id}`}
                style={scrollList}
              >
                {this.listItems()}
              </ul>
            </div>
          )}
        </div>
      );
    }
}

DropDownList.defaultProps = {
  id: '',
  select: undefined,
  styles: {},
  isArrow: true,
};

DropDownList.propTypes = {
  id: PropTypes.string,

  styles: PropTypes.shape({
    wrapper: PropTypes.objectOf(PropTypes.string),
    header:PropTypes.objectOf(PropTypes.string),
    headerTitle: PropTypes.objectOf(PropTypes.string),
    headerArrowIcon: PropTypes.objectOf(PropTypes.string),
    list: PropTypes.objectOf(PropTypes.string),
    listSearchBar: PropTypes.objectOf(PropTypes.string),
    scrollList: PropTypes.objectOf(PropTypes.string),
    listItem: PropTypes.objectOf(PropTypes.string),
    listItemNoResult: PropTypes.objectOf(PropTypes.string),
  }),

  title: PropTypes.string,

  list: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    activeTitle: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ])
  })).isRequired,
  
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  select: PropTypes.shape({ value: PropTypes.string }),
  isArrow: PropTypes.bool,
};

export default DropDownList;