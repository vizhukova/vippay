import React from 'react'
import {RoutingContext, Link} from 'react-router'
import  AuthActions from '../actions/AuthActions';
import  SettingsActions from '../actions/SettingsActions';
import  ProductsActions from '../actions/ProductsActions';
import SettingsStore from './../stores/SettingsStore';
import AuthStore from './../stores/AuthStore';
import IFrame from './../../../../common/js/IFrame';
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
        this.Out = this.Out.bind(this);
    }

    componentDidMount() {

        this.IFrameRequests();
        AuthStore.listen(this.update)
        SettingsStore.listen(this.updateSettings)
        SettingsActions.getCurrentPartner();
        SettingsActions.getCurrentClient();
        SettingsActions.getClients();
        SettingsActions.get();
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

    Out(e) {
        e.preventDefault();
        localStorage.removeItem('token');
        console.log('http://' + location.hostname + '/partner')
        location.href = 'http://' + location.hostname + '/partner';
        //location.reload();
    }

    onLoadIFrame() {
        console.log('-------main window send post')
        var token = localStorage.getItem('token');
        var win = document.getElementsByTagName('iframe')[0].contentWindow;
        if (token) win.postMessage(JSON.stringify({key: 'token', data: token, method: 'set'}), "*");
        else win.postMessage(JSON.stringify({key: 'token', method: 'get'}), "*");
    }

    IFrameRequests() {
        window.onmessage = function(e) {
            var data = JSON.parse(e.data);
            switch(data.method) {
             case 'set': localStorage.setItem(data.key, data.data);
                         break;
            }
            console.log('onmessage:', e.data);
            AuthActions.check(localStorage.getItem('token'))
        }
    }

    render() {
        console.log('App state: ', this.state)
        console.log('IFRAME::::', this.state.auth_domain)

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
                        </ul>
                       <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.state.current_client.login}<span className="caret"></span></a>
                              <ul className="dropdown-menu">
                                  {this.state.clients.map((item, index) => {
                                      return <ClientItem key={index} client={item} href={`http://${item.login}.${this.state.domain}#/products`}/>
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
            { this.state.auth_domain ?
                <IFrame src={`http://${this.state.auth_domain}/iframe`} onLoad={this.onLoadIFrame} />
                : null }
        </div>
    }
}

export default Application;