import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { createHashHistory } from 'history/lib';
var history = createHashHistory();
import $ from 'jquery';
import Promise from 'bluebird';
import Order from './components/Order';



    /*ReactDOM.render((
        <Router history={history}>
            <Route path="/order/:id" component={Order} >
            </Route>
        </Router>
    ), document.getElementById("app-container"));

*/
