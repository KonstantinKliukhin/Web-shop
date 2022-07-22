import { Component } from "react";

import ItemDescription from "../../components/itemDescription/itemDescription";
import ProductMedia from "../../components/productMedia/ProductMedia";


import { connect } from "react-redux";

import { fetchProduct} from "../../slices/productsSlice";

import productsWithCorrectPriceSelector from "../../selectors/ProductWithCorrectPrice";
import combineLoadingsSelector from "../../selectors/combineLoadingsSelector";


import setContent from "../../utils/setContent";



import './singleItemPage.scss';

class SingleItemPage extends Component {
    componentDidMount() {
        const {fetchProduct, id} = this.props;
        fetchProduct(id);
    }

    getSingleItemContent = () => {
        const {product, loadingStatus} = this.props;

        const singleItemContent = (product) => {
            const __description = product.description;

            return (
                <>
                    <ProductMedia
                        smallImgWidth={80}
                        smallImgHeight={80}
                        bigImgWidth={610}
                        bigImgHeight={511}
                        gap={40}>
                        {product?.gallery?.map((img, i) => (
                            <img key={i} src={img} alt={product.name}/>
                        ))}
                    </ProductMedia>
                        <div className="single-item__specification">
                            <ItemDescription 
                                price={product.price} 
                                name={product.name}
                                brand={product.brand}
                                attributes={product.attributes}
                                priceDown={true}/>
                            <button 
                                className="single-item__specification__btn">
                                ADD TO CART
                            </button>
                            <div className="single-item__specification__description" dangerouslySetInnerHTML={{__html: __description}}>
                            </div>
                        </div> 
                </>
            )
        }

        return setContent([loadingStatus], singleItemContent, product)
    }


    render() {
        return (
            <section className=" container single-item">
                {this.getSingleItemContent()}
            </section>
        )
    }
}

const mapStateToProps = (state) => {    
    return {
        loadingStatus: combineLoadingsSelector(
            state,
            state => state.products.productLoadingStatus,
            state => state.currencies.currenciesLoadingStatus,
        ),
        product: productsWithCorrectPriceSelector(
            state => state.products.activeProduct,
            state
        )
    }
}



export default connect(mapStateToProps, {fetchProduct})(SingleItemPage)
