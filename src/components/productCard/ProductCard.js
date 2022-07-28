import { Component } from 'react';
import { Link } from 'react-router-dom';
import emptyCartWhite from '../../assets/images/emptyCartWhite.svg';

import noImageAvailable from '../../assets/images/noImageAvailable.jpg';


import './productCard.scss';


class ProductCard extends Component {

  render() {
    const {name, brand, inStock, gallery, price, onCartBtnClick, cardPath} = this.props;
    return (
          <div className={`products__card ${inStock ? '': 'out-of-stock'}`}>
              <div className="products__card__img-wrapper">
                <Link className='block' to={cardPath}>
                  <img 
                    src={gallery || noImageAvailable} 
                    alt="product" 
                    className="products__card__img"/>
                </Link>
                    {inStock && price &&
                      <div 
                        className="products__card__cart-btn"
                        onClick={onCartBtnClick}>
                        <img src={emptyCartWhite} alt="add to cart" className="products__card__cart-btn__img"/>
                      </div>}
              </div>
              <Link className='block' to={cardPath}>
                <p className="products__card__title">{brand} {name}</p>
              </Link>
              <p className="products__card__price">{price?.currency?.symbol}{price?.amount}{price ? '' : 'No information about price'}</p>
          </div>
    )
  }
}

export default ProductCard;


