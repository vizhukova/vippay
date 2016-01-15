import React from 'react'
import {RoutingContext, Link} from 'react-router'

import  AuthActions from '../actions/AuthActions';
import AuthStore from './../stores/AuthStore';

class Application extends React.Component {

    constructor() {
        super();
        this.state = {

        };

        this.update = this.update.bind(this);
        this.Out = this.Out.bind(this);
    }

    componentDidMount() {
        AuthStore.listen(this.update)
        AuthActions.check();
    }

    componentWillUnmount() {
        AuthStore.unlisten(this.update)

    }

    update(state){
        debugger;
        if(!state.auth){
            location.hash = 'auth';
        }else{
           this.setState(state);
        }
    }

    Out() {
        localStorage.removeItem('token');
        location.reload();
    }

    render() {
        return <div>
                <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Brand</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><Link to="/products">Продукты клиента</Link></li>
                            <li><Link to={`/redirect/${8}-${11}`}>Redirect</Link></li>
                        </ul>
                       <ul className="nav navbar-nav navbar-right">
                          <li><button className="btn btn-link" onClick={this.Out}>Выход</button></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div>{this.props.children}</div>
        </div>
    }
}

export default Application;