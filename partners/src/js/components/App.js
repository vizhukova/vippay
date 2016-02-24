import React from 'react'
import {RoutingContext, Link} from 'react-router';
import cookie from'./../../../../common/Cookies';
import  AuthActions from '../actions/AuthActions';
import  SettingsActions from '../actions/SettingsActions';
import  ProductsActions from '../actions/ProductsActions';
import SettingsStore from './../stores/SettingsStore';
import AuthStore from './../stores/AuthStore';
import Loader from'./../../../../common/js/Loader';
import Alert from'./../../../../common/js/Alert/Alert';
import ModalWindow from'./../../../../common/js/ModalWindow/ModalWindow';
var _ = require('lodash');



class ClientItem extends React.Component {

    constructor(){
        super();
        this.state={};
    }

    render(){
        return  <li><a href={this.props.href}>{this.props.client.login}</a></li>
    }


}

class Application extends React.Component {

    constructor() {
        super();
        this.state = SettingsStore.getState();

        this.update = this.update.bind(this);
        this.updateSettings = this.updateSettings.bind(this);
    }

    componentDidMount() {

        AuthStore.listen(this.update)
        SettingsStore.listen(this.updateSettings)
        SettingsActions.get();

        AuthActions.check().then(() => {
                SettingsActions.getClients();
                SettingsActions.getCurrentClient();
                SettingsActions.getCurrentPartner();
            })
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
        }

        _.assign(this.state, state);
        this.setState({});
    }

    updateSettings(state){
        this.setState(state);
    }

    render() {
        console.log('App state: ', this.state)

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
                        <a className="navbar-brand" href="#"><i className="glyphicon glyphicon-home"></i></a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><Link to="/products">Продукты клиента</Link></li>
                        </ul>
                       <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.state.current_client.login}<span className="caret"></span></a>
                              <ul className="dropdown-menu">
                                  {this.state.clients.map((item, index) => {
                                      return <ClientItem key={index} client={item} href={`http://${item.login}.${this.state.domain}/${this.state.partner.login}#/products`}/>
                                  })}
                              </ul>
                            </li>
                             <li className="dropdown">
                              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="glyphicon glyphicon-user"></i>{this.state.partner.name}</a>
                                  <ul className="dropdown-menu">
                                    <li><Link to="/profile" activeClassName="active">Профиль</Link></li>
                                    <li><a href={this.state.out_link}>Выход</a></li>
                                  </ul>
                          </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <ModalWindow />
            <Alert />
              {this.state.auth ? null : <Loader />}
            <div>{this.props.children}</div>


        </div>
    }
}
export default Application;