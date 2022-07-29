import { Component } from "react";

import { func, string } from "prop-types";
import { categoriesType } from "../../types/categoriesTypes";

import { NavLink } from "react-router-dom";

import setContent from "../../utils/setContent";

import {connect} from 'react-redux';
import { fetchCategories, activeCategoryChanged} from '../../slices/categoriesSlice';

import NavActions from "../navActions/NavActions";

import brand from '../../assets/images/brand.svg'

import './navBar.scss'


class NavBar extends Component {
    componentDidMount() {
        this.props.fetchCategories();
    }

    getCategoryList = () => {
        const {categoriesLoadingStatus, categories, activeCategegory} = this.props;

        const categoryList = (categories) => {
            return categories.map(category => {
                return (
                    <li key={category.id} role='menuitem'>
                        <NavLink 
                            className={(isActive) => 
                                (`nav__categories__item ${isActive || 
                                    activeCategegory === category.name ? 'active': ''}`)} 
                            to={`/${category.name}`}
                        >
                            {category.name}
                        </NavLink>
                    </li>
                )
            })
        } 
        return setContent([categoriesLoadingStatus], categoryList, categories) 
    }

    render() {
        return (
            <nav 
                className="flex-sb-center container nav" 
                role='navigation'
            >
                <ul className="nav__categories" role='menubar'>
                    {this.getCategoryList()}
                </ul>
                <img src={brand} alt="brand icon" className="nav__brand" />
                <NavActions/>
            </nav>
        )
    } 
}

NavBar.propTypes = {
    fetchCategories: func,
    categoriesLoadingStatus: string.isRequired,
    activeCategory: string,
    categories: categoriesType,
}

const mapStateToProps = (state) => {
    return {
        activeCategegory: state.categories.activeCategory,
        categories: state.categories.categories,
        categoriesLoadingStatus: state.categories.categoriesLoadingStatus,
    }
}

export default connect(
    mapStateToProps, 
    {
        fetchCategories, 
        activeCategoryChanged
    }
)(NavBar);