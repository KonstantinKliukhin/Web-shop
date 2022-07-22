import { Component } from "react";

import ItemDescription from "../../components/itemDescription/itemDescription";
import ProductMedia from "../../components/productMedia/ProductMedia";

import { connect } from "react-redux";

import { fetchProduct, activeAtributeChanged} from "../../slices/productsSlice";
import { productAdded, productCountChanged } from "../../slices/cartSlice";

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
        const {product, loadingStatus, activeAtributeChanged} = this.props;

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
                                priceDown={true}
                                onSelectAtttribute={activeAtributeChanged}
                                />
                            <button 
                                onClick={() => this.props.productAdded(product)}
                                className="single-item__specification__btn">
                                ADD TO CART
                            </button>
                            <button 
                                onClick={() => this.props.productCountChanged({id: product.id, changes: {...product, count: 1}})}
                                className="single-item__specification__btn">
                                ADD TO CART
                            </button>
                            <div 
                                className="single-item__specification__description" 
                                dangerouslySetInnerHTML={{__html: __description}}/>
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

export default connect(mapStateToProps, {fetchProduct, activeAtributeChanged, productAdded, productCountChanged})(SingleItemPage)
