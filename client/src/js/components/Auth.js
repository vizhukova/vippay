import React from 'react'
import Login from './auth/Login';
import Staff from './auth/Staff';
import Register from './auth/Register';
import AlertActions from './../../../../common/js/Alert/AlertActions';

/**
 * Компонент формы логина/регистрации клиента/сотрудника
 */
class Auth extends React.Component {

    constructor() {
        super();
        this.state = {
            tab: 'login'
        };
        this.changeTab = this.changeTab.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    changeTab(e){
        e.preventDefault();
        AlertActions.hide();
        this.setState({tab: e.target.dataset.tab});
    }

    onKeyDown(e) {
        if(e.keyCode == '13') this.changeTab(e);
    }

    render() {

        var baseClass = 'tab';

        return <div>
            <div className="container">
                <div className="tab-container col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3 auth-form">
                    <ul className="tabs clearfix">

                        <li className={this.state.tab === 'login' ? `${baseClass} active` : baseClass} data-tab="login"
                            onClick={this.changeTab}
                            onKeyDown={this.onKeyDown}
                            tabIndex="1">
                            Логин
                        </li>

                        <li className={this.state.tab === 'register' ? `${baseClass} active` : baseClass} data-tab="register"
                            onClick={this.changeTab}
                            onKeyDown={this.onKeyDown}
                            tabIndex="2">
                            Регистрация
                        </li>

                        <li className={this.state.tab === 'staff' ? `${baseClass} active` : baseClass} data-tab="staff"
                            onClick={this.changeTab}
                            onKeyDown={this.onKeyDown}
                            tabIndex="3">
                            Сотрудникам
                        </li>

                    </ul>

                    <div className="tab-body boxed">

                        <form role="form">

                            {this.state.tab === 'register' ? <Register /> : null}
                            {this.state.tab === 'login' ? <Login /> : null}
                            {this.state.tab === 'staff' ? <Staff /> : null}
                        </form>
                    </div>

                    <div className="text-center"><a href={`${location.origin}/password/recover`}>Забыли пароль?</a></div>

                </div>
                </div>

        </div>
    }
}

export default Auth;