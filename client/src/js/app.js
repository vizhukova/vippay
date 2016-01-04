import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { createHashHistory } from 'history/lib';
var history = createHashHistory();
import $ from 'jquery';
import Promise from 'bluebird';
import App from './components/App';
import Auth from './components/Auth';


    ReactDOM.render((
        <Router history={history}>
            <Route path="/" component={App} />
            <Route path="/auth" component={Auth} />
        </Router>
    ), document.getElementById("app-container"));

