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

        var baseClass = 'tab';

        return <div>
            <div className="container">
                <div className="tab-container col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3 auth-form">
                    <ul className="tabs clearfix">

                        <li className={this.state.tab === 'login' ? `${baseClass} active` : baseClass} data-tab="login" onClick={this.changeTab}>
                            Логин
                        </li>

                        <li className={this.state.tab === 'register' ? `${baseClass} active` : baseClass} data-tab="register" onClick={this.changeTab}>Регистрация</li>

                    </ul>

                    <div className="tab-body boxed">

                        <form role="form">

                            {this.state.tab === 'register' ? <Register /> : null}
                            {this.state.tab === 'login' ? <Login /> : null}
                        </form>
                    </div>
                </div>
                </div>

        </div>
    }
}

export default Auth;