import React from 'react'
import Login from './auth/Login';
import Register from './auth/Register';


class Auth extends React.Component {

    constructor() {
        super();
        this.state = {
            tab: 'login'
        };
        this.changeTab = this.changeTab.bind(this);
    }

    changeTab(e){
        e.preventDefault();
        this.setState({tab: e.target.dataset.tab});
    }

    render() {

        var baseClass = 'btn btn-primary btn-lg btn-block';

        return <div>
            <div className="container">
                <div className="row form-register">
                    <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
                        <form role="form">
                            <div className="row">
                                <div className="col-xs-6 col-md-6 ">
                                    <button className={this.state.tab === 'login' ? `${baseClass} active` : baseClass} data-tab="login" onClick={this.changeTab}>Логин</button>
                                </div>
                                <div className="col-xs-6 col-md-6 ">
                                    <button className={this.state.tab === 'register' ? `${baseClass} active` : baseClass} data-tab="register" onClick={this.changeTab}>Регистрация</button>
                                </div>
                            </div>
                            <hr className="colorgraph"></hr>
                            {this.state.tab === 'register' ? <Register /> : null}
                            {this.state.tab === 'login' ? <Login /> : null}
                            <hr className="colorgraph"></hr>
                        </form>
                    </div>
                </div>
                </div>
        </div>
    }
}

export default Auth;