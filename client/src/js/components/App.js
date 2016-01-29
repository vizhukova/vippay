import React from 'react'
import {RoutingContext, Link} from 'react-router'
import  AuthActions from '../actions/AuthActions';
import  SettingsActions from '../actions/SettingsAction';
import AuthStore from './../stores/AuthStore';

class Application extends React.Component {

    constructor() {
        super();
        this.state = {
            user: {}
        };

        this.update = this.update.bind(this);
        this.Out = this.Out.bind(this);
    }

    componentDidMount() {
        AuthStore.listen(this.update);
        AuthActions.check(localStorage.getItem('token'))
            .then(function() {
                AuthActions.getMe();
               return SettingsActions.getAllCurrencies();
            })
    }

    componentWillUnmount() {
        AuthStore.unlisten(this.update)
    }

    Out(e) {
        e.preventDefault();
        localStorage.removeItem('token');
        location.reload();
    }

    update(state){
        if(!state.auth){
            location.hash = 'auth';
        }else{
           this.setState(state);
        }
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
                            <li><Link to="/category">Каталог</Link></li>
                            <li><Link to="/partners">Партнеры</Link></li>
                            <li><Link to="/statistics">Статистика</Link></li>
                            <li><Link to="/orders">Заказы</Link></li>
                            <li className="dropdown">
                                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Настройка</a>
                                  <ul className="dropdown-menu">
                                    <li><Link to="/settings">Ссылка</Link></li>
                                    <li><Link to="/rate">Курсы</Link></li>
                                    <li><Link to="/rate">Комиссия</Link></li>
                                    <li><Link to="/rate">Платежи</Link></li>
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
        </div>
    }
}

export default Application;