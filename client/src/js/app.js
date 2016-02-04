import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { createHashHistory } from 'history/lib';
var history = createHashHistory({
  queryKey: false
});
import $ from 'jquery';
import Promise from 'bluebird';
import App from './components/App';
import Auth from './components/Auth';
import Home from './components/Home';
import Category from './components/category/Category';
import NewCategoryForm from './components/category/form';
import Partners from './components/Partners';
import Statistics from './components/Statistics';
import Orders from './components/Orders';
import Products from './components/product/Products';
import Settings from './components/settings/Settings';
import Rate from './components/settings/Rate';
import Fee from './components/settings/Fee';
import Payment from './components/settings/Payment';
import NewProductForm from './components/product/form';


    ReactDOM.render((
        <Router history={history}>
            <Route path="/" component={App} >
                <IndexRoute component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/categories/:page" component={Category} />
                <Route path="/category">

                    <Route path="new" component={NewCategoryForm} />
                    <Route path=":id" component={NewCategoryForm} />
                    <Route path=":id/products" component={Products} />
                    <Route path=":id/edit" component={NewCategoryForm} />
                    <Route path=":id/delete" component={NewCategoryForm} />
                    <Route path=":id/products" component={Products} />
                    <Route path=":id/products/new" component={NewProductForm} />
                    <Route path=":id/products/:prod_id" component={NewProductForm} />

                </Route>

                <Route path="/partners" component={Partners} />
                <Route path="/statistics" component={Statistics} />
                <Route path="/orders" component={Orders} />
                <Route path="/settings" component={Settings} />
                <Route path="/rate" component={Rate} />
                <Route path="/fee" component={Fee} />
                <Route path="/payment" component={Payment} />
            </Route>
            <Route path="/auth" component={Auth} />
            <Route path="/partners/:id" component={Auth} />
        </Router>
    ), document.getElementById("app-container"));

