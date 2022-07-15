import React, { Component } from 'react'
import NavBar from '../navBar/NavBar';
import CartPage from '../../pages/cartPage/CartPage';
import ProductsPage from '../../pages/productsPage/ProductsPage';

export default class App extends Component {
  render() {
    return (
      <>
        <header>
          <NavBar/>
        </header>
        <main>
          {/* <CartPage/> */}
          <ProductsPage/>
        </main>
      </>
    )
  }
}
