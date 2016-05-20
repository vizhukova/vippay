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
import Links from './components/Links';
import Products from './components/Products';
import Profile from './components/Profile';


    ReactDOM.render((
        <Router history={history}>
            <Route path="/" component={App} >
                <IndexRoute component={Home} />
                <Route path="/products" component={Products} />
                <Route path="/links" component={Links} />
                <Route path="/profile" component={Profile} />
            </Route>
            <Route path="/auth/:id" component={Auth} />
            <Route path="/auth" component={Auth} />
        </Router>
    ), document.getElementById("app-container"));

