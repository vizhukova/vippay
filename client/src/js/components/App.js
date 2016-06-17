import React from 'react'
import {RoutingContext, Link} from 'react-router'
import  AuthActions from '../actions/AuthActions';
import  SettingsActions from '../actions/SettingsAction';
import AuthStore from './../stores/AuthStore';
import SettingsStore from './../stores/SettingsStore';
import Loader from'./../../../../common/js/Loader';
import ModalWindow from'./../../../../common/js/ModalWindow/ModalWindow';
import Alert from'./../../../../common/js/Alert/Alert';
import cookie from'./../../../../common/Cookies';
import Error from'./../../../../common/js/Error';
import _  from 'lodash';

/**
 * Основной компонент интерфейса клиента
 */
class Application extends React.Component {

    constructor() {
        super();
        this.state = {
            user: {},
            isActiveTariff: true
        };

        this.update = this.update.bind(this);
        this.updateSettings = this.updateSettings.bind(this);
        this.out = this.out.bind(this);
    }

    componentDidMount() {

        AuthActions.check()
            .then(function() {
                AuthActions.getMe();
                SettingsActions.getAllCurrencies();
                SettingsActions.getTariff();
                SettingsActions.getMessages();
                return SettingsActions.getBasicCurrency();

            })

        SettingsActions.get();

        AuthStore.listen(this.update);
        SettingsStore.listen(this.updateSettings);
    }

    componentWillUnmount() {
        AuthStore.unlisten(this.update);
        SettingsStore.unlisten(this.updateSettings);
    }

    update(state){
        if(state.isOut) {
            location.href = `http://${this.state.auth_domain}/#/auth`;
        }

        if(!state.auth){
            location.hash = 'auth';
        }
        _.assign(this.state, state);
        this.setState({});
    }

    updateSettings(state) {
        _.assign(this.state, state);
        this.setState({});
    }

    out(e) {
        e.preventDefault();
        console.log(this.state)
        AuthActions.out();
    }

    render() {
        return <div className="app">
                <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>
                        <a className="navbar-brand" href="#"><i className="glyphicon glyphicon-home"></i></a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><Link to="/categories" activeClassName="active">Каталог товаров</Link></li>
                            <li className="dropdown">
                              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Партнерская программа</a>
                                  <ul className="dropdown-menu">
                                    <li><Link to="/settings" activeClassName="active">Настройка</Link></li>
                                    <li><Link to="/partners" activeClassName="active">Партнеры</Link></li>
                                    <li><Link to="/partners_links" activeClassName="active">Партнерские ссылки</Link></li>
                                  </ul>
                          </li>
                            <li><Link to="/orders" activeClassName="active">Заказы</Link></li>
                            <li className="dropdown">
                                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Настройка</a>
                                  <ul className="dropdown-menu">
                                    <li><Link to="/rate" activeClassName="active">Курсы</Link></li>
                                    <li><Link to="/fee" activeClassName="active">Комиссия</Link></li>
                                    <li><Link to="/payment" activeClassName="active">Платежи</Link></li>
                                    { this.state.isBusinessTariff ? null : <li><Link to="/promo" activeClassName="active">Промо акции</Link></li>}
                                    { this.state.isBusinessTariff ? null : <li><Link to="/basket" activeClassName="active">Корзина</Link></li>}
                                    { this.state.isStaff || this.state.isBusinessTariff ? null : <li><Link to="/staff" activeClassName="active">Сотрудники</Link></li>}
                                  </ul>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                          <li className="dropdown">
                              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="glyphicon glyphicon-user"></i>{this.state.user.name}</a>
                                  <ul className="dropdown-menu">
                                      {this.state.isStaff ? null : <li><Link to="/profile" activeClassName="active">Профиль</Link></li>}
                                    <li>
                                        <a onClick={this.out}>Выход</a>
                                    </li>
                                  </ul>
                          </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Alert />
            <ModalWindow />
            {!this.state.isActiveTariff && location.hash.slice(2) !== 'profile' ?
                <Error /> :
            (this.state.auth ? <div>{this.props.children}</div> : <Loader />)}

        </div>
    }
}

export default Application;