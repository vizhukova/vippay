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
import Promo from './components/promo/Promo';
import PromoForm from './components/promo/form';
import Partners from './components/Partners';
import Statistics from './components/Statistics';
import Orders from './components/Orders';
import Products from './components/product/Products';
import Settings from './components/settings/Settings';
import Rate from './components/settings/Rate';
import Fee from './components/settings/Fee';
import Profile from './components/settings/Profile';
import Staff from './components/settings/staff/Staff';
import formStaff from './components/settings/staff/form';
import Payment from './components/settings/Payments';
import NewProductForm from './components/product/form';
import PartnerLinks from './components/partner_links/Links';
import NewPartnerLinkForm from './components/partner_links/form';
import AlertActions from './../../../common/js/Alert/AlertActions';

    function onLeave() {
        AlertActions.onLeave();
    }

    ReactDOM.render((
        <Router history={history}>
            <Route path="/" component={App} >
                <IndexRoute component={Home} />
                <Route path="/home" component={Home} onLeave={onLeave} />
                <Route path="/categories" component={Category} onLeave={onLeave} />
                <Route path="/category" onLeave={onLeave}>

                    <Route path="new" component={NewCategoryForm} onLeave={onLeave} />
                    <Route path=":id" component={NewCategoryForm} onLeave={onLeave} />
                    <Route path=":id/products" component={Products} onLeave={onLeave} />
                    <Route path=":id/edit" component={NewCategoryForm} onLeave={onLeave} />
                    <Route path=":id/delete" component={NewCategoryForm} onLeave={onLeave} />
                    <Route path=":id/products" component={Products} onLeave={onLeave} />
                    <Route path=":id/products/new" component={NewProductForm} onLeave={onLeave} />
                    <Route path=":id/products/:prod_id" component={NewProductForm} onLeave={onLeave} />

                </Route>

                <Route path="promo" component={Promo} onLeave={onLeave} />
                <Route path="/promo" onLeave={onLeave}>
                    <Route path="new" component={PromoForm} onLeave={onLeave} />
                    <Route path=":id" component={PromoForm} onLeave={onLeave} />
                </Route>

                <Route path="/partners" component={Partners} onLeave={onLeave} />
                <Route path="/statistics" component={Statistics} onLeave={onLeave} />
                <Route path="/orders" component={Orders} onLeave={onLeave} />
                <Route path="/settings" component={Settings} onLeave={onLeave} />
                <Route path="/rate" component={Rate} onLeave={onLeave} />
                <Route path="/fee" component={Fee} onLeave={onLeave} />
                <Route path="/payment" component={Payment} onLeave={onLeave} />
                <Route path="/profile" component={Profile} onLeave={onLeave} />

                <Route path="/partners_links" component={PartnerLinks} onLeave={onLeave} />
                <Route path="/partners_links" onLeave={onLeave} >

                    <Route path="new" component={NewPartnerLinkForm} onLeave={onLeave} />
                    <Route path=":id" component={NewPartnerLinkForm} onLeave={onLeave} />

                </Route>

                 <Route path="/staff" component={Staff} onLeave={onLeave} />
                <Route path="/staff" onLeave={onLeave} >

                    <Route path="new" component={formStaff} onLeave={onLeave} />
                    <Route path=":id" component={formStaff} onLeave={onLeave} />

                </Route>>
            </Route>
            <Route path="/auth" component={Auth} />
            <Route path="/partners/:id" component={Auth} />
        </Router>
    ), document.getElementById("app-container"));

