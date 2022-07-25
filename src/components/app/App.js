import {Component, lazy, Suspense} from 'react';

import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom';

import Spinner from '../spinner/Spinner';


const NavBar = lazy(() => import('../navBar/NavBar'));
const CartPage = lazy(() => import('../../pages/cartPage/CartPage'));
const  ProductsPage = lazy(() => import('../../pages/productsPage/ProductsPage'));
const SingleItemPage = lazy(() => import('../../pages/singleItemPage/SingleItemPage'));

class App extends Component {
    render() {
        return (
            <Router>
                <header>
                    <NavBar/>
                </header>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Switch>
                            <Route exact path='/cart'>
                                <CartPage/>
                            </Route>
                            <Route
                                exact
                                path='/:category/:id'
                                render={({match}) => <SingleItemPage id={match.params.id}/>}/>
                            <Route
                                path={['/:category', '/']}
                                exact
                                render={
                                    ({match}) => <ProductsPage pathName={match.params.category}/>
                                }/>
                        </Switch>
                    </Suspense>
                </main>
            </Router>
        )
    }
}
export default App;