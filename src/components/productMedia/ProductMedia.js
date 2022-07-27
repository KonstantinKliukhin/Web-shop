import { Component, Children, cloneElement } from "react";
import PropTypes from 'prop-types';

import arrow from '../../resources/img/arrow-down.svg';
import noImageAvailable from '../../resources/img/noImageAvailable.jpg';

import './productMedia.scss';

class ProductMedia extends Component {

    constructor(props) {
        super(props)

        this.state = {
            pages: null,
            currentPage: 0,
            offset: 0,
            maxOffset: 0,
            sliderHeight: 0,
            upperArrowVisible: false,
            downArrowVisible: false,
            visibleElementsCount: 0,
        }
    }

    componentDidMount() {

        const {children, smallImgHeight, bigImgHeight, smallImgWidth, gap, styles} = this.props;

        const {smallImg} = styles;

        const pages = Children.map(children, (child, i) => {
            return cloneElement(child, {
                style: {
                    minHeight: `${smallImgHeight}px`,
                    maxHeight: `${smallImgHeight}px`,
                    minWidth: `${smallImgWidth}px`,
                    maxWidth: `${smallImgWidth}px`,
                    cursor: 'pointer',
                    ...smallImg,
                },
                className: 'product-media__slider__slide',
                'data-slide-count': i 
            })
        })

        const visibleElementsCount =  Math.floor(bigImgHeight / (smallImgHeight + gap));

        const sliderHeight = visibleElementsCount * (smallImgHeight + gap) - gap;

        const maxOffset = -(pages.length) * (smallImgHeight + gap) + gap;

        this.setState({
            pages,
            sliderHeight,
            visibleElementsCount,
            downArrowVisible: visibleElementsCount < pages.length,
            maxOffset
        })
    }



    handleUpArrowClick = () => {
        const {smallImgHeight, gap} = this.props;
        this.setState(({offset}) => {
            const newOffset = offset + smallImgHeight + gap;

            const nextOffset = newOffset + smallImgHeight + gap;

            return {
                offset: Math.min(newOffset, 0),
                upperArrowVisible: nextOffset <= 0,
                downArrowVisible: true,
            }
        })
    }

    handleDownArrowClick = () => {
        const {smallImgHeight, gap} = this.props;

        this.setState(({offset, sliderHeight, maxOffset}) => {

            const newOffset = offset - smallImgHeight-gap;

            return {
                offset: Math.max(newOffset, maxOffset),
                upperArrowVisible: true,
                downArrowVisible: sliderHeight - newOffset !== -maxOffset,
            }
        })
    }

    handleSlideClick = (e) => {
        this.setState({
            currentPage: e.target.attributes['data-slide-count'].value
        })
    }
    
    render() {
        const {bigImgWidth, bigImgHeight, children, gap, styles} = this.props;
        const {
            sliderHeight, 
            offset, 
            upperArrowVisible, 
            downArrowVisible, 
            currentPage,
            pages,
        } = this.state;

        const {arrowUp, arrowDown, media, slider, window, container, bigImg} = styles;

        const upperArrow = upperArrowVisible && 
            (<img 
                src={arrow} 
                onClick={this.handleUpArrowClick} 
                alt="arrow up" 
                style={arrowUp}
                className="product-media__slider__arrow product-media__slider__arrow-up"/>
            )
        
        const downArrow = downArrowVisible && (
            <img 
                src={arrow} 
                onClick={this.handleDownArrowClick} 
                alt="arrow down" 
                style={arrowDown}
                className="product-media__slider__arrow product-media__slider__arrow-down"/>
        )

        return (
            <div className="product-media" style={media}>
                <div 
                    style={{maxHeight: `${sliderHeight}px`, ...slider}} 
                    className="product-media__slider">

                    <div className="product-media__slider__window" style={window}>
                        <div 
                            onClick={this.handleSlideClick}
                            style={{transform: `translateY(${offset}px)`, rowGap: `${gap}px`, ...container}} 
                            className="product-media__slider__slides-container">
                            {pages}
                        </div>
                    </div>
                    {upperArrow}
                    {downArrow}
                </div>
                <div 
                    style={{width: bigImgWidth, height: bigImgHeight, ...bigImg}} 
                    className="product-media__current-img">    
                    {children[currentPage]}
                </div>
            </div>
        )
    }
}

ProductMedia.defaultProps = {
    styles: {},
    children: [<img src={noImageAvailable} alt='no images'/>],
}

ProductMedia.propTypes = {
    smallImgHeight: PropTypes.number.isRequired,
    smallImgWidth: PropTypes.number.isRequired,
    bigImgHeight: PropTypes.number.isRequired,
    bigImgWidth: PropTypes.number.isRequired,
    gap: PropTypes.number.isRequired,

    styles: PropTypes.shape({
        arrowUp: PropTypes.objectOf(PropTypes.string),
        arrowDown:PropTypes.objectOf(PropTypes.string),
        media: PropTypes.objectOf(PropTypes.string),
        slider: PropTypes.objectOf(PropTypes.string),
        window: PropTypes.objectOf(PropTypes.string),
        container: PropTypes.objectOf(PropTypes.string),
        bigImg: PropTypes.objectOf(PropTypes.string),
    }),
}

export default ProductMedia;