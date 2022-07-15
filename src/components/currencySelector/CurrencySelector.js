import { Component } from "react";

import './currencySelector.scss';


class CurrencySelector extends Component {

    render() {
        return (
            <ul className="currency-selector-list">
                <li className="currency-selector-item">USD $</li>
                <li className="currency-selector-item">EUR $</li>
                <li className="currency-selector-item">UAH $</li>
            </ul>
        )
    }
}

export default CurrencySelector;