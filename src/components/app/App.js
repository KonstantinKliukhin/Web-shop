import {Component, lazy, Suspense} from 'react';

import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom';

import NavBar from '../navBar/NavBar';
import Spinner from '../spinner/Spinner';
import ErrorBoundery from '../errorBoundary/ErrorBoundary';

const CartPage = lazy(() => import('../../pages/cartPage/CartPage'));
const ProductsPage = lazy(() => import('../../pages/productsPage/ProductsPage'));
const SingleItemPage = lazy(() => import('../../pages/singleItemPage/SingleItemPage'));
const Page404 = lazy(() => import('../../pages/404/404'));


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
                                render={({match}) => (
                                    <ErrorBoundery>
                                        <SingleItemPage 
                                            categoryPath={match.params.category} 
                                            id={match.params.id}/>
                                    </ErrorBoundery>
                                )}
                            />
                            <Route
                                path={['/:category', '/']}
                                exact
                                render={
                                    ({match}) => <ProductsPage categoryPath={match.params.category}/>
                                }
                            />
                            <Route path='*'>
                                <Page404/>
                            </Route>
                        </Switch>
                    </Suspense>
                </main>
            </Router>
        )
    }
}

export default App;