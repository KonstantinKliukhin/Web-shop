import { Component } from "react";
import NavActions from "../navActions/NavActions";
import './navBar.scss'
import brand from '../../resources/img/brand.svg'
import { Link } from "react-router-dom";


class NavBar extends Component {

    render() {
        return (
            <nav className="flex-sb-center container nav">
                <ul className="nav__categories">
                    <Link to='/'><li className="nav__categories__item">Women</li></Link>
                    <Link to='/'><li className="nav__categories__item">Men</li></Link>
                    <Link to='/'><li className="nav__categories__item">Kids</li></Link>
                </ul>
                <img src={brand} alt="" className="nav__brand" />
                <NavActions/>
            </nav>
        )
    }
}

export default NavBar;