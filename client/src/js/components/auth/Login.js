import React from 'react'
import ApiActions from './../../actions/ApiActions'
import PasswordInput from './../../../../../common/js/PasswordInput';
import LoginInput from './../../../../../common/js/LoginInput';
import Alert from './../../../../../common/js/Alert';


class Login extends React.Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.login = this.login.bind(this);
        this.state = {
            errors: {},
            error: {}
        };
    }

    onChange(e){
        if(e.keyCode == 13) {
            this.login();
            return;
        }
        var state = {};
        console.log(e.target.name)
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onClick(e) {
        this.setState({error: {}});
    }

    onKeyDown(e) {
		if(e.keyCode == 13) {
            this.login();
        }
	}

    login() {
        var self = this;
        var path = '';

        if(!this.isCorrectField()) {
            this.setState({});
            return;
        }

        if(location.hash.split('/')[1] == 'partners') path = '/partner/login';
        else path = 'client/login';

        ApiActions.post(path, this.state)
            .then(function(data){
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
                console.log('ERROR:', err);
                self.setState({error: {
                    type: 'error',
                    title: 'Ошибка',
                    text: 'Проверьте правильность заполнения данных'
                }})
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
            <Alert type={this.state.error.type} text={this.state.error.text} title={this.state.error.title} />
			<div className="form-group">
                <input type="text" name="email" id="email"
                       className={this.state.errors.email ? `${baseClass} invalid` : baseClass}
                       onChange={this.onChange}
                       onClick={this.onClick}
                       placeholder="Электронная почта" tabIndex="1" />
			</div>
            <div className="form-group">
                <PasswordInput
							name="password"
							id="password"
							class={this.state.errors.password ? `${baseClass} invalid` : baseClass}
							onChange={this.onChange}
                            onClick={this.onClick}
                            placeholder="Пароль" tabIndex="2"/>
			</div>

            <div className="btn btn-primary btn-block" onClick={this.login}>Отправить</div>
            </div>

    }
}

export default Login;