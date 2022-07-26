import { Component } from "react";
import NavActions from "../navActions/NavActions";
import './navBar.scss'
import brand from '../../resources/img/brand.svg'
import {connect} from 'react-redux';
import { fetchCategories,selectAllCategories, activeCategoryChanged} from '../../slices/categoriesSlice';
import setContent from "../../utils/setContent";
import { NavLink } from "react-router-dom";


class NavBar extends Component {
    componentDidMount() {
        const {fetchCategories} = this.props;
        fetchCategories();
    }


    getCategoryList = () => {
        const {categoriesLoadingStatus, categories, activeCategegory} = this.props;

        const categoryList = (categories) => {
            return categories.map(category => {
                return (
                    <li key={category.id} >
                        <NavLink 
                            className={(isActive) => 
                                (`nav__categories__item ${isActive || 
                                    activeCategegory === category.name ? 'active': ''}`)} 
                            to={`/${category.name}`}>
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
            <nav className="flex-sb-center container nav">
                <ul className="nav__categories">
                    {this.getCategoryList()}
                </ul>
                <img src={brand} alt="" className="nav__brand" />
                <NavActions/>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        activeCategegory: state.categories.activeCategory,
        categories: selectAllCategories(state),
        categoriesLoadingStatus: state.categories.categoriesLoadingStatus,
    }
}

export default connect(mapStateToProps, {fetchCategories, activeCategoryChanged})(NavBar);