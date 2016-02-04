import React from 'react'
import ApiActions from './../../actions/ApiActions'

import PasswordInput from './../ui/PasswordInput';
import LoginInput from './../ui/LoginInput';


class Login extends React.Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.login = this.login.bind(this);
        this.state = {errors: {}};
    }

    onChange(e){
        var state = {};
        console.log(e.target.name)
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    login() {
        var self = this;
        var path = '';

        if(!this.isCorrectField()) {
            this.setState({});
            return;
        }
        debugger

        if(location.hash.split('/')[1] == 'partners') path = '/partner/login';
        else path = 'client/login';

        ApiActions.post(path, this.state)
            .then(function(data){
                debugger
                var result = {};
                var redirect = '';
                if(data.redirect) {//for partners login
                    result = data.user;
                    redirect = data.redirect;
                    localStorage.setItem('token', result.token);
                    location.href = redirect;
                } else {
                    result = data;
                    localStorage.setItem('token', result.token);
                    location.assign('http://' + data.domain)
                    //location.hash = redirect;
                }
                console.log('Token: ' + result.token);

            })
            .catch(function(err){
                console.log('error');
            })
    }

    isCorrectField() {
        var empty = false;

        if(!this.state.email || this.state.email.length == 0) {this.state.errors.email = ["Поле 'электронная почта' должно быть заполнено"]; empty = true;}
        if(!this.state.password || this.state.password.length == 0) {this.state.errors.password = ["Поле 'пароль' должно быть заполнено"]; empty = true;}

        return !empty;

    }


    render() {
        var baseClass = "form-control input-lg";

        return <div>

			<div className="form-group">
                <LoginInput
                    class={this.state.errors.email ? `${baseClass} invalid` : baseClass}
                    onChange={this.onChange}
                />
			</div>
            <div className="form-group">
                <PasswordInput
							name="password"
							id="password"
							class={this.state.errors.password ? `${baseClass} invalid` : baseClass}
							onChange={this.onChange} placeholder="Пароль"/>
			</div>

            <div className="btn btn-primary btn-block" onClick={this.login}>Отправить</div>
            </div>

    }
}

export default Login;