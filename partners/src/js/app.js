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
import Products from './components/Products';


    ReactDOM.render((
        <Router history={history}>
            <Route path="/" component={App} >
                <IndexRoute component={Home} />
                <Route path="/products" component={Products} />
            </Route>
            <Route path="/auth/:id" component={Auth} />
        </Router>
    ), document.getElementById("app-container"));

