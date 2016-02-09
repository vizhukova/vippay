import React from 'react';
import ApiActions from './../../actions/ApiActions';
import Alert from './../../../../../common/js/Alert';
import PasswordInput from './../../../../../common/js/PasswordInput';
import cookie from'./../../../../../common/Cookies';


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
            return;
        }
	}

    componentDidMount() {

	}

    login() {
        var self = this;
        if(!this.isCorrectField()) {
            this.setState({});
            return;
        }

        ApiActions.post('partner/login', this.state)
            .then(function(data){
                cookie.setCookie('token', data.user.token, {
                    domain: '.vippay.loc'
                });

                location.href = data.redirect;
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

        if( empty ) {
            //alert('Все поля должны быть заполнены');
            return false;
        }

        return true;
    }


    render() {
       var baseClass = "form-control input-lg";

        return <div>

            <Alert type={this.state.error.type} text={this.state.error.text} title={this.state.error.title} />
			<div className="form-group">
				<input type="text" name="email" id="email"
                       className={this.state.errors.email ? `${baseClass} invalid` : baseClass}
                       onChange={this.onChange}
                       onKeyDown={this.onKeyDown}
                       onClick={this.onClick} placeholder="Электронная почта" tabIndex="1" />
			</div>
            <div className="form-group">
				<PasswordInput
							name="password"
							id="password"
							class={this.state.errors.password ? `${baseClass} invalid` : baseClass}
							onChange={this.onChange}
                            onClick={this.onClick}
                            onKeyDown={this.onKeyDown}
                            placeholder="Пароль"/>
			</div>

            <div className="btn btn-primary btn-block" onClick={this.login}>Отправить</div>
            </div>

    }
}

export default Login;