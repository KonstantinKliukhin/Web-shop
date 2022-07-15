import {Component} from 'react';

import './itemDescription.scss';

class ItemDescription extends Component {
    
    render() {
        return (
            <div className="item__description">
            <h3 className="item__description__brand">
                Apollo 
            </h3>
            <h4 className="item__description__title">Running Short</h4>
            {this.props.priceDown || <p className="item__description__price">$50.00</p>}
            <div className="item__description__block">
                <p className="item__description__block__title">
                    Size:
                </p>
                <ul className="item__description__block__list">
                    <li className="item__description__block__item">
                        <a className="item__description__btn" href="http://localhost:3000/">XS</a>
                    </li>
                    <li className="item__description__block__item">
                        <a className="item__description__btn" href="http://localhost:3000/">XS</a>
                    </li>
                    <li className="item__description__block__item">
                        <a className="item__description__btn" href="http://localhost:3000/">XS</a>
                    </li>
                    <li className="item__description__block__item">
                        <a className="item__description__btn" href="http://localhost:3000/">XS</a>
                    </li>
                    <li className="item__description__block__item">
                        <a className="item__description__btn" href="http://localhost:3000/">XS</a>
                    </li>
                    <li className="item__description__block__item">
                        <a className="item__description__btn" href="http://localhost:3000/">XS</a>
                    </li>
                </ul>
            </div>
            <div className="item__description__block">
                <p className="item__description__block__title">
                    Color:
                </p>
                <ul className="item__description__block__list">
                    <li className="item__description__block__item">
                        <a className="item__description__color" href="http://localhost:3000/"></a>
                    </li>
                    <li className="item__description__block__item">
                        <a className="item__description__color" href="http://localhost:3000/"></a>
                    </li>
                    <li className="item__description__block__item">
                        <a className="item__description__color" href="http://localhost:3000/"></a>
                    </li>
                    <li className="item__description__block__item">
                        <a className="item__description__color" href="http://localhost:3000/"></a>
                    </li>
                    <li className="item__description__block__item">
                        <a className="item__description__color" href="http://localhost:3000/"></a>
                    </li>
                    <li className="item__description__block__item">
                        <a className="item__description__color" href="http://localhost:3000/"></a>
                    </li>
                    <li className="item__description__block__item">
                        <a className="item__description__color" href="http://localhost:3000/"></a>
                    </li>
                    <li className="item__description__block__item">
                        <a className="item__description__color" href="http://localhost:3000/"></a>
                    </li>
                </ul>
            </div>
            {this.props.priceDown && (
                <div className="item__description__block">
                    <p className="item__description__block__title">
                        PRICE:
                    </p>
                    <p className="item__description__price">$50.00</p>
                </div>
            )}
        </div>
        )
    }
}

export default ItemDescription;