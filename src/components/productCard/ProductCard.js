import { Component } from 'react';

import { bool, func, string } from 'prop-types';
import { priceType } from '../../types/productTypes';

import { Link } from 'react-router-dom';

import emptyCartWhite from '../../assets/images/emptyCartWhite.svg';
import noImageAvailable from '../../assets/images/noImageAvailable.jpg';

import './productCard.scss';


class ProductCard extends Component {

  render() {
    const {
        name, 
        brand, 
        inStock, 
        gallery, 
        price, 
        onCartBtnClick, 
        cardPath
    } = this.props;
    
    return (
        <li className={`products__card ${inStock ? '': 'out-of-stock'}`}>
            <Link
                className='block'
                to={cardPath}
            >
                <div className="products__card__img-wrapper">
                        <img
                            src={gallery || noImageAvailable}
                            alt={name}
                            className="products__card__img"
                        />
                    {inStock && price &&
                        <div
                            className="products__card__cart-btn"
                            tabIndex={0}
                            role='button'
                            onClick={(e) => {
                                e.preventDefault();
                                onCartBtnClick(e)
                            }}
                            onKeyDown={(e) => {
                                if (e.code === 'Enter' || e.code === 'Space') {
                                    onCartBtnClick(e)
                                }
                            }}
                        >
                            <img
                                src={emptyCartWhite}
                                alt="add to cart"
                                className="products__card__cart-btn__img"
                            />
                      </div>
                    }
                </div>
                    <p className="products__card__title">{brand} {name}</p>
                <p className="products__card__price">
                    {price ?
                        `${price?.currency?.symbol}${price?.amount}` :
                        'No information about price'}
                </p>
            </Link>
        </li>
    )
  }
}

ProductCard.propTypes = {
    name: string.isRequired,
    brand: string.isRequired,
    inStock: bool.isRequired,
    gallery: string.isRequired,
    onCartBtnClick: func,
    cardPath: string.isRequired,
    price: priceType,
}

export default ProductCard;


