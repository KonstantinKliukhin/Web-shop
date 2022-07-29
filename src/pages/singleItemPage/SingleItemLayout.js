import { Component } from 'react';

import { Helmet } from 'react-helmet';

import { func } from "prop-types";
import { productType } from "../../types/productTypes";

import { Interweave } from 'interweave';
import transformToDescription from './transformToDescriptionJSX';

import ItemDescription from "../../components/itemDescription/itemDescription";
import ProductMedia from "../../components/productMedia/ProductMedia";


class SingleItemLayout extends Component {
    render() {
        const {
            product, 
            activeAtributeChanged, 
            cartProductAdded
        } = this.props;

        const isActiveBtn = product?.inStock && product?.price; 

        return (
            <section className=" container single-item">
                <Helmet>
                    <title>{product?.name}</title>
                    <meta
                        name="description"
                        content={`information about ${product?.name}`}
                    />
                </Helmet>
                <ProductMedia
                    smallImgWidth={80}
                    smallImgHeight={80}
                    bigImgWidth={610}
                    bigImgHeight={511}
                    gap={40}
                >
                    {product?.gallery?.map((img, i) => (
                        <img key={i} src={img} alt={product?.name}/>
                    ))}
                </ProductMedia>
                    <div className="single-item__specification">
                        <ItemDescription 
                            price={product?.price} 
                            name={product?.name}
                            brand={product?.brand}
                            attributes={product?.attributes}
                            priceDown={true}
                            onSelectAtttribute={product?.inStock ? activeAtributeChanged : null}
                            attributesIsDisabled={!product?.inStock}
                        />
                        <button 
                            onClick={isActiveBtn ? () => cartProductAdded(product): null}
                            className={`single-item__specification__btn ${isActiveBtn ? '':'disabled'}`}
                        >
                            {isActiveBtn ? 'ADD TO CART': 'Out of stock'}
                        </button>
                        <div className="single-item__specification__description">
                            <Interweave 
                                content={product?.description} 
                                transform={
                                    transformToDescription("single-item__specification__description")
                                } 
                                transformOnlyAllowList={false}
                                tagName={'div'}
                                allowList={['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'p', 'ul', 'li']}
                            />
                        </div>
                    </div> 
            </section>
        )
    }
}

SingleItemLayout.propTypes = {
    activeAtributeChanged: func.isRequired,
    cartProductAdded: func.isRequired,
    product: productType,
}

export default SingleItemLayout