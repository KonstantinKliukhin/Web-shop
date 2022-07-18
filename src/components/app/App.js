import {Component} from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


import NavBar from '../navBar/NavBar';
import CartPage from '../../pages/cartPage/CartPage';
import ProductsPage from '../../pages/productsPage/ProductsPage';


class App extends Component {


    render() {
        return (
            <Router>

                    <header>
                            <NavBar/>
                    </header>
                    <main>
                        <Switch>
                            <Route exact path='/'>
                                <ProductsPage/>
                            </Route>
                            <Route exact path='/cart'>
                                <CartPage/> 
                            </Route>
                        </Switch>
                    </main>
            </Router>


        )
    }
}

export default App;