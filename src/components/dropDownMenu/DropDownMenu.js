import { Component } from "react";
import PropTypes from 'prop-types';


import './dropDownMenu.scss';

class DropDownMenu extends Component {

    componentDidMount() {
        if (this.props.overlay) {
            document.body.style.overflow = 'hidden';
        }

        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        if (this.props.overlay) {
            document.body.style.overflow = 'unset';
        }

        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }

    handleClickOutside = (e) => {
        if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
          this.props.toggleClick();
        }
    }



    render() {
        const {styles, content, overlay, overlayStyles, toggleClick, ...props} = this.props;

        return (
            <>
                {overlay &&
                 <div 
                    onClick={toggleClick}
                    style={overlayStyles} 
                    className="dropdown__overlay"/>}
                <div style={styles} className='dropdown-menu' ref={this.setWrapperRef}>
                    {content(props)}
                </div>
            </>
        )
    }
}

DropDownMenu.propTypes = {
    overlay: PropTypes.bool,
    toggleClick: PropTypes.func,
    overlayStyles: PropTypes.objectOf(PropTypes.string),
    content: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string),
}

export default DropDownMenu;

