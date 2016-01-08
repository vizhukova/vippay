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
import Category from './components/Category';
import NewCategoryForm from './components/NewCategoryForm';
import Partners from './components/Partners';
import Statistics from './components/Statistics';
import Orders from './components/Orders';
import Products from './components/Products';


    ReactDOM.render((
        <Router history={history}>
            <Route path="/" component={App} >
                <IndexRoute component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/category" component={Category}>
                    <Route path="new" component={NewCategoryForm} />
                    <Route path=":id" component={NewCategoryForm} />
                    <Route path=":id/edit" component={NewCategoryForm} />
                    /*<Route path="product/new" component={Products} />
                    <Route path="product/:id/edit" component={Products} />
                    */
                </Route>
                <Route path="/partners" component={Partners} />
                <Route path="/statistics" component={Statistics} />
                <Route path="/orders" component={Orders} />
            </Route>
            <Route path="/auth" component={Auth} />
        </Router>
    ), document.getElementById("app-container"));

