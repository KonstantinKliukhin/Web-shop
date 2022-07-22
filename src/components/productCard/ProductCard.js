import { Component } from 'react';
import emptyCartWhite from '../../resources/img/emptyCartWhite.svg';

import './productCard.scss';


class ProductCard extends Component {


  render() {
    const {name, brand, inStock, gallery, attributes, price} = this.props;
    return (
          <div className={`products__card ${inStock ? '': 'out-of-stock'}`}>
              <div className="products__card__img-wrapper">
                  <img src={gallery} alt="product" className="products__card__img"/>
                    {inStock && <div className="products__card__cart-btn">
                      <img src={emptyCartWhite} alt="add to cart" className="products__card__cart-btn__img"/>
                    </div>}
              </div>
              <p className="products__card__title">{brand} {name}</p>
              <p className="products__card__price">{price.currency.symbol}{price.amount}</p>
          </div>
    )
  }
}

export default ProductCard;


