import { Component } from "react";
import NavActions from "../navActions/NavActions";
import './navBar.scss'
import brand from '../../resources/img/brand.svg'


class NavBar extends Component {

    render() {
        return (
            <nav className="flex-sb-center container nav">
                <ul className="nav__categories">
                    <li className="nav__categories__item">Women</li>
                    <li className="nav__categories__item">Men</li>
                    <li className="nav__categories__item">Kids</li>
                </ul>
                <img src={brand} alt="" className="nav__brand" />
                <NavActions/>
            </nav>
        )
    }
}

export default NavBar;