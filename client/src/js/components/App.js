import React from 'react'
import {RoutingContext, Link} from 'react-router'
import  AuthActions from '../actions/AuthActions';
import  SettingsActions from '../actions/SettingsAction';
import AuthStore from './../stores/AuthStore';
import SettingsStore from './../stores/SettingsStore';
import Loader from'./../../../../common/js/Loader';
import Alert from'./../../../../common/js/Alert';
import cookie from'./../../../../common/Cookies';
import Error from'./../../../../common/js/Error';
import _  from 'lodash';


class Application extends React.Component {

    constructor() {
        super();
        this.state = {
            user: {},
            isActiveTariff: true
        };

        this.update = this.update.bind(this);
        this.updateSettings = this.updateSettings.bind(this);
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
                            <li><Link to="/categories" activeClassName="active">Каталог</Link></li>
                            <li><Link to="/partners" activeClassName="active">Партнеры</Link></li>
                            <li><Link to="/statistics" activeClassName="active">Статистика</Link></li>
                            <li><Link to="/orders" activeClassName="active">Заказы</Link></li>
                            <li className="dropdown">
                                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Настройка</a>
                                  <ul className="dropdown-menu">
                                    <li><Link to="/settings" activeClassName="active">Ссылка</Link></li>
                                    <li><Link to="/rate" activeClassName="active">Курсы</Link></li>
                                    <li><Link to="/fee" activeClassName="active">Комиссия</Link></li>
                                    <li><Link to="/payment" activeClassName="active">Платежи</Link></li>
                                  </ul>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                          <li className="dropdown">
                              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="glyphicon glyphicon-user"></i>{this.state.user.name}</a>
                                  <ul className="dropdown-menu">
                                    <li><Link to="/profile" activeClassName="active">Профиль</Link></li>
                                    <li><a href={this.state.out_link} >Выход</a></li>
                                  </ul>


                          </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Alert />

            {!this.state.isActiveTariff && location.hash.slice(2) !== 'profile' ?
                <Error /> :
            (this.state.auth ? <div>{this.props.children}</div> : <Loader />)}

        </div>
    }
}

export default Application;