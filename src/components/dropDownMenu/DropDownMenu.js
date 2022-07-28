import { Component } from "react";
import {createPortal} from 'react-dom';

import {
    elementType, 
    string, 
    oneOfType, 
    shape, 
    objectOf, 
    element, 
    func, 
    bool
} from 'prop-types';

import './dropDownMenu.scss';


const overlayRoot = document.getElementById('overlay-root');

class DropDownMenu extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isMenuOpen: false,
        }

        this.overlayWrapper = document.createElement('div');
    }

    componentDidMount() {
        const isOverlay = this.props;
      
        if (isOverlay) {
            document.body.style.overflow = 'hidden';
            overlayRoot.appendChild(this.overlayWrapper);
        }
    }

    componentDidUpdate() {
        const {isMenuOpen} = this.state;
        const {isOverlay} = this.props;

        if (isOverlay && !isMenuOpen) {
            document.body.style.overflow = 'unset';
        } else if (isOverlay) {
            document.body.style.overflow = 'hidden';
        }

        setTimeout(() => {
            if (isMenuOpen) {
                document.addEventListener('click', this.handleClickOutside);
            } else {
                document.removeEventListener('click', this.handleClickOutside)
            }
        }, 0)
    }

    componentWillUnmount() {
        const isOverlay = this.props;
      
        if (isOverlay) {
            document.body.style.overflow = 'unset';
            overlayRoot.removeChild(this.overlayWrapper);
        }

        document.removeEventListener('click', this.handleClickOutside)
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }

    handleClickOutside = (e) => {
        if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
            this.close();
        }
    }

    close = () => {
        this.setState({
            isMenuOpen: false,
        })
    }

    onToggleMenu = () => {
        this.setState(({isMenuOpen}) => ({
            isMenuOpen: !isMenuOpen,
        }))
    }



    render() {
        const {title, styles, content, isOverlay, id, ...props} = this.props;

        const {menu, header, headerTitle, overlayStyles, list} = styles;

        const {isMenuOpen} = this.state;

        const overlay = (
            <div 
                onClick={this.handleClickOutside}
                style={overlayStyles} 
                className={`dropdown-menu__overlay ${id}`}
            />
        )
        
        return (
            <div className={`dropdown-menu ${id}`} style={menu}>
                <button
                  onClick={this.onToggleMenu}
                  className={`dropdown-menu__header ${id}`}
                  style={header}
                >
                    <div 
                        className={`dropdown-menu__title ${id}`} 
                        style={headerTitle}
                    >
                        {title}
                    </div>
                </button>
                {isOverlay && isMenuOpen &&
                    createPortal(
                        overlay,
                        this.overlayWrapper
                    )
                }
                {isMenuOpen && 
                    <div 
                        style={list} 
                        ref={this.setWrapperRef} 
                        className={`dropdown-menu__list ${id}`}
                    >
                        {content({...props, onToggleMenu: this.onToggleMenu})}
                    </div>
                }
            </div>
        )
    }
}

DropDownMenu.defaultProps = {
    id: '',
    styles: {},
    isOverlay: false,
};

DropDownMenu.propTypes = {
    title: oneOfType([
        elementType, 
        string,
        element,
    ]),
    styles: shape({
        menu: objectOf(string),
        header:objectOf(string),
        headerTitle: objectOf(string),
        overlayStyles: objectOf(string),
        list: objectOf(string),
    }),
    content: func.isRequired,
    isOverlay: bool,
}

export default DropDownMenu;



