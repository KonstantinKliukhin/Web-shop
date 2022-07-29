import { Component, Children, cloneElement } from "react";

import { objectOf, shape, number, string } from 'prop-types';

import arrow from '../../assets/images/arrowDownWhite.svg';
import noImageAvailable from '../../assets/images/noImageAvailable.jpg';

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
        const {height, width, children} = this.props;

        this.setState({
            pages: Children.map(children, (child) => {
                return cloneElement(child, {
                    style: {
                        height: `${height}px`,
                        minWidth: `${width}px`,
                        maxWidth: `${width}px`,
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
        const {height, width, styles, id} = this.props;

        const {offset, pages} = this.state;

        const { 
            slider, 
            window, 
            container, 
            arrowLeftWrapper, 
            arrowRightWrapper, 
            arrowLeft, 
            arrowRight 
        } = styles;

        return (
            <div 
                style={{height: `${height}px`, width: `${width}px`, ...slider}} 
                className={`slider ${id}`}
            >
                <div style={window} className={`slider__window ${id}`}>
                    <div 
                        style={{transform: `translate(${offset}px)`, ...container}} 
                        className={`slider__slides-container ${id}`}
                    >
                        {pages}
                    </div>
                </div>
                <div 
                    onClick={this.handleLeftArrowClick} 
                    className={`slider-arrow slider__arrow-left ${id}`}
                    style={arrowLeftWrapper}
                >
                    <img 
                        role='button'
                        src={arrow} 
                        alt="arrow to previous slide" 
                        className={`slider-arrow__img ${id}`}
                        style={arrowLeft} 
                    />
                </div>
                <div 
                    onClick={this.handleRightArrowClick} 
                    className={`slider-arrow slider__arrow-right ${id}`}
                    style={arrowRightWrapper}
                >
                    <img 
                        role='button'
                        src={arrow} 
                        alt="arrow to next slide" 
                        className={`slider-arrow__img ${id}`}
                        style={arrowRight}
                    />
                </div>
            </div>
        )
    }
}

Slider.defaultProps = {
    id: '',
    height: 200,
    width: 200,
    styles: {},
    children: [<img src={noImageAvailable} alt='no images'/>],
}

Slider.propTypes = {
    id: string,
    height: number.isRequired,
    width: number.isRequired,
    styles: shape({
        slider: objectOf(string),
        window:objectOf(string),
        container: objectOf(string),
        arrowLeftWrapper: objectOf(string),
        arrowRightWrapper: objectOf(string),
        arrowLeft: objectOf(string),
        arrowRight: objectOf(string),
      }),
}

export default Slider;