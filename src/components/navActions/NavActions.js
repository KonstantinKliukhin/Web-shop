import {Component} from 'react';

import MiniCart from '../miniCart/MiniCart';
import CurrencySelector from '../currencySelector/CurrencySelector';
import DropDownMenu from '../dropDownMenu/DropDownMenu';

import './navActions.scss';

import arrowDown from '../../resources/img/arrow-down.svg'
import emptyCart from '../../resources/img/emptyCart.svg'

class NavActions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currencyActive: false,
            cartActive: false,
        }
    }

    handleCurrencyClick = () => {
        this.setState(({currencyActive}) => ({
            currencyActive: !currencyActive,
            cartActive: false,
        }))
    }

    handleCartClick = () => {
        this.setState(({cartActive}) => ({
            cartActive: !cartActive,
            currencyActive: false,
        }));
    }

    handle
    render() {
        const {currencyActive, cartActive} = this.state;

        return(
            <div className="nav__actions">
                <div className='nav__currencies'>
                    <button className='nav__btn--currency' onClick={this.handleCurrencyClick}>
                        $ 
                        <img 
                            className='arrow' 
                            style={currencyActive ? {transform: 'rotate(180deg)'} : null} 
                            src={arrowDown} 
                            alt='arrow'/>
                    </button>
                    {currencyActive && 
                        <DropDownMenu 
                            content={
                                () => <CurrencySelector />
                            }
                            toggleClick={this.handleCurrencyClick}
                            styles={{top: '75%', left: '-30%'}}/>
                    }
                </div>
                <div className='nav__cart-menu'>
                    <button className='nav__btn--cart' onClick={this.handleCartClick}>
                        <img src={emptyCart} alt="emptyCart"/>
                        <div className="nav__cart-menu__item-count">3</div>
                    </button>
                    {cartActive && 
                        <DropDownMenu 
                            overlay={true}
                            overlayStyles={{top: '80px'}}
                            toggleClick={this.handleCartClick} 
                            styles={{top: '100%', right: '0'}} 
                            content={() => <MiniCart/>} />
                    }
                </div> 
            </div>
        )
    }
}

export default NavActions;