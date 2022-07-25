import { Component } from "react";

import { Redirect } from "react-router-dom";

import setContent from "../../utils/setContent";

import ProductList from '../../components/productList/productList';

import { connect } from "react-redux";
import { activeCategoryChanged, selectAllCategories } from "../../slices/categoriesSlice";


class ProductsPage extends Component {

    componentDidMount() {
        const {activeCategoryChanged, pathName, categories} = this.props;

        const currentCategoryIndex = categories?.findIndex((category) => {
            return category.name === pathName
        })

        if (pathName && categories?.length && currentCategoryIndex >= 0) {
            activeCategoryChanged(pathName)
        }
    }

    componentDidUpdate(prevProps) {
        const {pathName, activeCategoryChanged} = this.props;

        if (pathName && prevProps.pathName !== pathName) {
            activeCategoryChanged(pathName)
        }
    }

    render() {
        const {categories, categoriesLoadingStatus, pathName} = this.props;

        const currentCategoryIndex = categories.findIndex((category) => {
            return category.name === pathName
        })

        let redirect = null;

        if (!pathName || (categories.length && currentCategoryIndex >= 0)) {
            redirect = setContent(
                [categoriesLoadingStatus], 
                () => <Redirect to={`/${categories[0].name}`}/>, 
                null,
                null,
            )
        }
        return(
            <section className="container products">
                {redirect}
                <ProductList title/>
            </section>
        )
    }
}

const mapStateToProps = (state) => ({
    categories: selectAllCategories(state),
    categoriesLoadingStatus: state.categories.categoriesLoadingStatus,
})

export default connect(mapStateToProps, {activeCategoryChanged})(ProductsPage)





