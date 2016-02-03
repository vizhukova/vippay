import React from 'react'
import {RoutingContext, Link} from 'react-router'
import  AuthActions from '../actions/AuthActions';
import  SettingsActions from '../actions/SettingsActions';
import  ProductsActions from '../actions/ProductsActions';
import SettingsStore from './../stores/SettingsStore';
import AuthStore from './../stores/AuthStore';
var _ = require('lodash');



class ProductItem extends React.Component {

    constructor(){
        super();
        this.state={};
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        e.preventDefault();
        SettingsActions.setCurrentClient(this.props.client);
        ProductsActions.getAll();
    }

    render(){
        return  <li onClick={this.onChange}><a>{this.props.client.login}</a></li>
    }


}


class Application extends React.Component {

    constructor() {
        super();
        this.state = SettingsStore.getState();

        this.update = this.update.bind(this);
        this.Out = this.Out.bind(this);
    }

    componentDidMount() {
        AuthStore.listen(this.update)
        SettingsStore.listen(this.update)
        AuthActions.check();
        SettingsActions.getCurrentPartner();
    }

    componentWillUnmount() {
        AuthStore.unlisten(this.update)
        SettingsStore.unlisten(this.update)

    }

    update(state){
        if(!this.state.auth) {
            if (!state.auth) {
                location.hash = 'auth';
            }
            else {
                SettingsActions.get();
            }
        }

        _.assign(this.state, state);
        this.setState({});
    }

    Out() {
        localStorage.removeItem('token');
        location.reload();
    }

    render() {
        console.log(this.state)
        var self = this;

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
                        <a className="navbar-brand" href="#">VIPPAY</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><Link to="/products">Продукты клиента</Link></li>
                            <li><Link to={`/redirect/${8}-${11}`}>Redirect</Link></li>
                        </ul>
                       <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.state.current_client.login}<span className="caret"></span></a>
                              <ul className="dropdown-menu">
                                  {this.state.clients.map((item, index) => {
                                      return <ProductItem key={index} client={item} />
                                  })}
                              </ul>
                            </li>
                             <li className="dropdown">
                              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="glyphicon glyphicon-user"></i>{this.state.partner.name}</a>
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