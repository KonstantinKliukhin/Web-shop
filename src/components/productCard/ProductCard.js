import { Component } from 'react';
import { Link } from 'react-router-dom';
import product from '../../resources/img/product.png';
import emptyCartWhite from '../../resources/img/emptyCartWhite.svg';
import classNames from 'classnames';

import './productCard.scss';


class ProductCard extends Component {


  render() {
    const {addToCartEnabled, inStock} = this.props;

    const cardClass = classNames({
      'products__card': true,
      'out-of-stock': !inStock,
      'add-to-cart-enabled': addToCartEnabled,
    })

    return (
        <Link className="block" to='/product'>
          <div className={cardClass}>
              <div className="products__card__img-wrapper">
                  <img src={product} alt="product" className="products__card__img"/>
                  {addToCartEnabled && (
                    <div className="products__card__cart-btn">
                      <img src={emptyCartWhite} alt="add to cart" className="products__card__cart-btn__img"/>
                    </div>
                  )}
              </div>
              <p className="products__card__title">Apollo Running Short</p>
              <p className="products__card__price">$50.00</p>
          </div>
        </Link>
    )
  }
}

export default ProductCard;


