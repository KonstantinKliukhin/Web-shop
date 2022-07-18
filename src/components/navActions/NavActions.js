import {Component} from 'react';

import MiniCart from '../miniCart/MiniCart';
import DropDownMenu from '../dropDownMenu/DropDownMenu';
import DropDownList from '../dropDownList/DropDownList';

import './navActions.scss';
import { currenciesStyles, miniCartStyles } from './dropDownStyles';

import emptyCart from '../../resources/img/emptyCart.svg';


class NavActions extends Component {

    render() {
        const CartCounter = (
            <>
                <img src={emptyCart} alt="emptyCart"/>
                <div className="nav__cart-menu__item-count">3</div>
            </>
        )

        return(
            <div className="nav__actions">
                <DropDownList
                    name='currencies'
                    id='currencies'
                    isArrow
                    onChange={(item, name) => console.log(item, name)}
                    styles = {currenciesStyles}
                    select = {{
                        value: '$'
                    }}
                    list = {[
                        {
                            label: '$ USD',
                            value: '$',
                        },
                        {
                            label: '# EUR',
                            value: '#',
                        }
                    ]}
                />
                <DropDownMenu
                    isOverlay
                    styles = {miniCartStyles}
                    title = {CartCounter}
                    content={(props) => <MiniCart {...props}/>}
                />
            </div>
        )
    }
}

export default NavActions;