import { Component } from "react";

import ProductList from '../../components/productList/productList';

import { connect } from "react-redux";
import { activeCategoryChanged } from "../../slices/categoriesSlice";


class ProductsPage extends Component {

    componentDidMount() {
        const {activeCategoryChanged, pathName} = this.props;

        activeCategoryChanged(pathName)
    }

    componentDidUpdate(prevProps) {
        const {pathName, activeCategoryChanged} = this.props;

        if (prevProps.pathName !== pathName) {
            activeCategoryChanged(pathName)
        }
    }

    render() {
        return(
            <section className="container products">
                <ProductList title/>
            </section>
        )
    }
}

export default connect(null, {activeCategoryChanged})(ProductsPage)





