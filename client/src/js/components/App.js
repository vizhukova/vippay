import React from 'react'
import {RoutingContext, Link} from 'react-router'
import  AuthActions from '../actions/AuthActions';
import  SettingsActions from '../actions/SettingsAction';
import AuthStore from './../stores/AuthStore';
import SettingsStore from './../stores/SettingsStore';
import IFrame from './IFrame';

class Application extends React.Component {

    constructor() {
        super();
        this.state = {
            user: {}
        };

        this.update = this.update.bind(this);
        this.updateSettings = this.updateSettings.bind(this);
        this.Out = this.Out.bind(this);
    }

    componentDidMount() {

        window.onmessage = function(e) {
            console.log(e.origin)
            console.log('onmessage:', e.data);
            localStorage.setItem('token', e.data);
        }

        SettingsActions.get();

        AuthStore.listen(this.update);
        SettingsStore.listen(this.updateSettings);
    }

    componentWillUnmount() {
        AuthStore.unlisten(this.update)
        SettingsStore.unlisten(this.update)
    }

    Out(e) {
        e.preventDefault();
        var win = document.getElementsByTagName('iframe')[0].contentWindow;
        win.postMessage(JSON.stringify({key: 'token', method: 'remove'}), "*");
        localStorage.removeItem('token');
        location.reload();
    }

    onLoadIFrame() {
        console.log('-------main window send post')
        var win = document.getElementsByTagName('iframe')[0].contentWindow;
        win.postMessage(JSON.stringify({key: 'token', method: 'get'}), "*");

        AuthActions.check(localStorage.getItem('token'))

            .then(function() {
                AuthActions.getMe();
                SettingsActions.getAllCurrencies();
                return SettingsActions.getBasicCurrency();

            })
    }

    update(state){
        if(!state.auth){
            location.hash = 'auth';
        }
    }

    updateSettings(state) {
        this.setState(state);
    }

    render() {
        return <div className="app">
                <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
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
                                    <li><Link to="/rate">Курсы</Link></li>
                                    <li><a href="#" onClick={this.Out}>Выход</a></li>
                                  </ul>


                          </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div>{this.props.children}</div>
            <IFrame src={`http://${this.state.auth_domain}/iframe`} onLoad={this.onLoadIFrame} />
        </div>
    }
}

export default Application;