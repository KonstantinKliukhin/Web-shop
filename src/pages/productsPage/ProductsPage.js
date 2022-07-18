import { Component } from "react";

import {Link} from 'react-router-dom';

import './productsPage.scss';

import product from '../../resources/img/product.png';
import emptyCartWhite from '../../resources/img/emptyCartWhite.svg';


class ProductsPage extends Component {


    render() {

        return(
            <section className="container products">
                    <h1 className="products__title">Category name</h1>
                    <div className="products__card-field">
                        <Link className="block" to='/product'>
                            <div className="products__card out-of-stock">
                                <div className="products__card__img-wrapper">
                                    <img src={product} alt="product" className="products__card__img"/>
                                </div>
                                <p className="products__card__title">Apollo Running Short</p>
                                <p className="products__card__price">$50.00</p>
                            </div>
                        </Link>
                        <Link className="block" to='/product'>
                            <div tabIndex={0} className="products__card add-to-cart-enabled">
                                <div className="products__card__img-wrapper">
                                    <img src={product} alt="product" className="products__card__img"/>
                                    <div className="products__card__cart-btn">
                                        <img src={emptyCartWhite} alt="add to cart" className="products__card__cart-btn__img"/>
                                    </div>
                                </div>
                                <p className="products__card__title">Apollo Running Short</p>
                                <p className="products__card__price">$50.00</p>
                            </div>
                        </Link>
                        <Link className="block" to='/product'>
                            <div className="products__card">
                                <div className="products__card__img-wrapper">
                                    <img src={product} alt="product" className="products__card__img"/>
                                </div>
                                <p className="products__card__title">Apollo Running Short</p>
                                <p className="products__card__price">$50.00</p>
                            </div>
                        </Link>
                        <Link className="block" to='/product'>
                            <div className="products__card">
                                <div className="products__card__img-wrapper">
                                    <img src={product} alt="product" className="products__card__img"/>
                                </div>
                                <p className="products__card__title">Apollo Running Short</p>
                                <p className="products__card__price">$50.00</p>
                            </div>
                        </Link>
                        <Link className="block" to='/product'>
                            <div className="products__card">
                                <div className="products__card__img-wrapper">
                                    <img src={product} alt="product" className="products__card__img"/>
                                </div>
                                <p className="products__card__title">Apollo Running Short</p>
                                <p className="products__card__price">$50.00</p>
                            </div>
                        </Link>
                        <Link className="block" to='/product'>
                            <div className="products__card">
                                <div className="products__card__img-wrapper">
                                    <img src={product} alt="product" className="products__card__img"/>
                                </div>
                                <p className="products__card__title">Apollo Running Short</p>
                                <p className="products__card__price">$50.00</p>
                            </div>
                        </Link>
                        <Link className="block" to='/product'>
                            <div className="products__card">
                                <div className="products__card__img-wrapper">
                                    <img src={product} alt="product" className="products__card__img"/>
                                </div>
                                <p className="products__card__title">Apollo Running Short</p>
                                <p className="products__card__price">$50.00</p>
                            </div>
                        </Link>
                        <Link className="block" to='/product'>
                            <div className="products__card">
                                <div className="products__card__img-wrapper">
                                    <img src={product} alt="product" className="products__card__img"/>
                                </div>
                                <p className="products__card__title">Apollo Running Short</p>
                                <p className="products__card__price">$50.00</p>
                            </div>
                        </Link>
                        <Link className="block" to='/product'>
                            <div className="products__card">
                                <div className="products__card__img-wrapper">
                                    <img src={product} alt="product" className="products__card__img"/>
                                </div>
                                <p className="products__card__title">Apollo Running Short</p>
                                <p className="products__card__price">$50.00</p>
                            </div>
                        </Link>
                        <Link className="block" to='/product'>
                            <div className="products__card">
                                <div className="products__card__img-wrapper">
                                    <img src={product} alt="product" className="products__card__img"/>
                                </div>
                                <p className="products__card__title">Apollo Running Short</p>
                                <p className="products__card__price">$50.00</p>
                            </div>
                        </Link>
                        <Link className="block" to='/product'>
                            <div className="products__card">
                                <div className="products__card__img-wrapper">
                                    <img src={product} alt="product" className="products__card__img"/>
                                </div>
                                <p className="products__card__title">Apollo Running Short</p>
                                <p className="products__card__price">$50.00</p>
                            </div>
                        </Link>
                        <Link className="block" to='/product'>
                            <div className="products__card">
                                <div className="products__card__img-wrapper">
                                    <img src={product} alt="product" className="products__card__img"/>
                                </div>
                                <p className="products__card__title">Apollo Running Short</p>
                                <p className="products__card__price">$50.00</p>
                            </div>
                        </Link>
                        <Link className="block" to='/product'>
                            <div className="products__card">
                                <div className="products__card__img-wrapper">
                                    <img src={product} alt="product" className="products__card__img"/>
                                </div>
                                <p className="products__card__title">Apollo Running Short</p>
                                <p className="products__card__price">$50.00</p>
                            </div>
                        </Link>
                        <Link className="block" to='/product'>
                            <div className="products__card">
                                <div className="products__card__img-wrapper">
                                    <img src={product} alt="product" className="products__card__img"/>
                                </div>
                                <p className="products__card__title">Apollo Running Short</p>
                                <p className="products__card__price">$50.00</p>
                            </div>
                        </Link>
                        <Link className="block" to='/product'>
                            <div className="products__card">
                                <div className="products__card__img-wrapper">
                                    <img src={product} alt="product" className="products__card__img"/>
                                </div>
                                <p className="products__card__title">Apollo Running Short</p>
                                <p className="products__card__price">$50.00</p>
                            </div>
                        </Link>
                        <Link className="block" to='/product'>
                            <div className="products__card">
                                <div className="products__card__img-wrapper">
                                    <img src={product} alt="product" className="products__card__img"/>
                                </div>
                                <p className="products__card__title">Apollo Running Short</p>
                                <p className="products__card__price">$50.00</p>
                            </div>
                        </Link>
                    </div>
            </section>
        )
    }
}

export default ProductsPage;