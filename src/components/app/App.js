import {Component} from 'react';

import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';


import NavBar from '../navBar/NavBar';
import CartPage from '../../pages/cartPage/CartPage';
import ProductsPage from '../../pages/productsPage/ProductsPage';
import SingleItemPage from '../../pages/singleItemPage/SingleItemPage';


class App extends Component {


    render() {
        return (
            <Router>
                <header>
                    <NavBar/>
                </header>
                <main>
                    <Switch>
                        <Route exact path='/cart'>
                            <CartPage/> 
                        </Route>
                        <Route exact path='/:category/:id' render={({match}) => <SingleItemPage id={match.params.id}/>}/>

                        <Route 
                            path='/:category' 
                            exact 
                            render={
                                ({match}) => <ProductsPage pathName={match.params.category}/>
                            }/>
                        <Route path='/' exact>
                            <Redirect to='/all'/>
                        </Route>
                    </Switch>
                </main>
            </Router>
        )
    }
}
export default App;