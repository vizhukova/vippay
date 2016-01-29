import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { createHashHistory } from 'history/lib';
var history = createHashHistory();
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
import NewProductForm from './components/product/form';


    ReactDOM.render((
        <Router history={history}>
            <Route path="/" component={App} >
                <IndexRoute component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/category" component={Category}>
                    <Route path="new" component={NewCategoryForm} />
                    <Route path=":id" component={NewCategoryForm} />
                    <Route path=":id/edit" component={NewCategoryForm} />
                    <Route path=":id/delete" component={NewCategoryForm} />
                    <Route path=":id/products" component={Products} />
                    <Route path=":id/products/new" component={NewProductForm} />
                    <Route path=":id/products/:prod_id" component={NewProductForm} />
                </Route>
                <Route path="/products/:id" component={Products} />
                <Route path="/partners" component={Partners} />
                <Route path="/statistics" component={Statistics} />
                <Route path="/orders" component={Orders} />
                <Route path="/settings" component={Settings} />
                <Route path="/rate" component={Rate} />
            </Route>
            <Route path="/auth" component={Auth} />
        </Router>
    ), document.getElementById("app-container"));

