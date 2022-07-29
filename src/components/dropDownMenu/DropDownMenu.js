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
            document.body.style.position = 'fixed';
            document.body.style.top = '0';
            document.body.style.left = '0'
            document.body.style.width = '100%';

            overlayRoot.appendChild(this.overlayWrapper);
        }
    }

    componentDidUpdate() {
        const {isMenuOpen} = this.state;
        const {isOverlay} = this.props;

        if (isOverlay && !isMenuOpen) {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = ''
            document.body.style.width = '';
        } else if (isOverlay) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = '0';
            document.body.style.left = '0'
            document.body.style.width = '100%';
        }

        setTimeout(() => {
            if (isMenuOpen) {
                document.addEventListener('click', this.handleClickOutside);
                document.addEventListener('keydown', this.onEsc)
            } else {
                document.removeEventListener('click', this.handleClickOutside)
                document.removeEventListener('keydown', this.onEsc)

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

        document.removeEventListener('keydown', this.onEsc)
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
        });
    }

    onEsc = (e) => {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    onToggleMenu = () => {
        this.setState(({isMenuOpen}) => ({
            isMenuOpen: !isMenuOpen,
        }));
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
                    aria-controls={id}
                    aria-expanded={isMenuOpen}
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
                        id={id}
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



