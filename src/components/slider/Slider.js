import { Component, Children, cloneElement } from "react";
import arrow from '../../resources/img/arrowDownWhite.svg';
import PropTypes from 'prop-types';


import './slider.scss';

class Slider extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pages: null,
            offset: 0,
        }
    }

    componentDidMount() {
        this.setState({
            pages: Children.map(this.props.children, (child) => {
                return cloneElement(child, {
                    style: {
                        height: `${this.props.height}px`,
                        minWidth: `${this.props.width}px`,
                        maxWidth: `${this.props.width}px`,
                    }
                })
            })
        })
    }

    handleLeftArrowClick = () => {
        this.setState(({offset}) => {
            const newOffset = offset + this.props.width

            return {
                offset: Math.min(newOffset, 0)
            }
        })
    }

    handleRightArrowClick = () => {
        this.setState(({offset, pages}) => {
            const maxOffset = -(pages.length - 1) * this.props.width;
            const newOffset = offset - this.props.width

            return {
                offset: Math.max(newOffset, maxOffset)
            }
        })
    }



    render() {
        const {height, width} = this.props;

        const {offset, pages} = this.state;

        return (
            <div 
                style={{height: `${height}px`, width: `${width}px`}} 
                className="slider">
                <div className="slider__window">
                    <div style={{transform: `translate(${offset}px)`}} className="slider__slides-container">
                        {pages}
                    </div>
                </div>
                <div onClick={this.handleLeftArrowClick} className="slider-arrow slider__arrow-left">
                    <img src={arrow} alt="" className="slider-arrow__img" />
                </div>
                <div onClick={this.handleRightArrowClick} className="slider-arrow slider__arrow-right">
                    <img src={arrow} alt="" className="slider-arrow__img" />
                </div>
            </div>
        )
    }
}

Slider.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
}

export default Slider;