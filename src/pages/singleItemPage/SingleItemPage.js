import { Component } from "react";

import ItemDescription from '../../components/itemDescription/itemDescription';
import ProductMedia from "../../components/productMedia/ProductMedia";

import product from '../../resources/img/product.png';


import './singleItemPage.scss';

class SingleItemPage extends Component {
    render() {
        return (
            <section className=" container single-item">
                <ProductMedia
                    smallImgWidth={80}
                    smallImgHeight={80}
                    bigImgWidth={610}
                    bigImgHeight={511}
                    gap={40}>
                    <img src='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;.v=1604021663000' alt="" />
                    <img src={product} alt="" />
                    <img src={product} alt="" />
                    <img src={product} alt="" />
                    <img src={product} alt="" />
                    <img src={product} alt="" />
                </ProductMedia>
                <div className="single-item__specification">
                    <ItemDescription priceDown={true}/>
                    <button className="single-item__specification__btn">ADD TO CART</button>
                    <p className="single-item__specification__description">
                        Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.
                    </p>
                </div>
            </section>
        )
    }
}

export default SingleItemPage;