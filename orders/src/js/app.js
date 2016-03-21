import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { createHashHistory } from 'history/lib';
var history = createHashHistory();
import $ from 'jquery';
import Promise from 'bluebird';
import Order from './components/Order';
import Basket from './components/Basket';



    ReactDOM.render((
       <Router history={history}>
         <Route path="/" component={Basket} />
       </Router>
    ), document.getElementById("app-container"));
//<Route path="/" component={Order} />