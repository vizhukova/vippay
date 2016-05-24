import React from 'react';
import ApiActions from './../../actions/ApiActions';
import Alert from './../../../../../common/js/Alert/Alert';
import AlertActions from './../../../../../common/js/Alert/AlertActions';
import PasswordInput from './../../../../../common/js/PasswordInput';
import cookie from'./../../../../../common/Cookies';

function getSearch(){

    var obj = {};

    location.search.slice(1).split('&').map((el) => {
        el = el.split('=');
        obj[el[0]] = el[1]
    });

    return obj;

}

/**
 * Форма логина партнера
 */
class Login extends React.Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.login = this.login.bind(this);
        this.state = {
            errors: {},
            referer: getSearch().ref
            };
    }

    onChange(e){
        var state = {};
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onClick(e) {
        AlertActions.hide();
    }

    /**
     * Проверка нажатия на Enter
     * @param e
     */
    onKeyDown(e) {
		if(e.keyCode == 13) {
            this.login();
            return;
        }
	}

    login() {
        var self = this;
        if(!this.isCorrectField()) {
            this.setState({});
            return;
        }

        ApiActions.post('partner/login', this.state)
            .then(function(data){

                location.href = data.redirect;
            })
    }

    /**
     * Валидация
     * @returns {boolean}
     */
    isCorrectField() {
        var empty = false;

        if(!this.state.email || this.state.email.length == 0) {this.state.errors.email = ["Поле 'электронная почта' должно быть заполнено"]; empty = true;}
        if(!this.state.password || this.state.password.length == 0) {this.state.errors.password = ["Поле 'пароль' должно быть заполнено"]; empty = true;}

        if( empty ) {
             AlertActions.set({
                    type: 'error',
                    title: 'Ошибка',
                    text: 'Проверьте правильность введенных данных'
                })
            return false;
        }

        return true;
    }


    render() {
       var baseClass = "form-control input-lg";

        return <div>

            <Alert />
			<div className="form-group">
				<input type="text" name="email" id="email"
                       className={this.state.errors.email ? `${baseClass} invalid` : baseClass}
                       onChange={this.onChange}
                       onKeyDown={this.onKeyDown}
                       onClick={this.onClick} placeholder="Электронная почта" tabIndex="3" />
			</div>
            <div className="form-group">
				<PasswordInput
							name="password"
							id="password"
							class={this.state.errors.password ? `${baseClass} invalid` : baseClass}
							onChange={this.onChange}
                            onClick={this.onClick}
                            onKeyDown={this.onKeyDown}
                            tabIndex="4"
                            placeholder="Пароль"/>
			</div>
            <div className="btn btn-primary btn-block" tabIndex="5" onClick={this.login} onKeyDown={this.onKeyDown}>Отправить</div>
            </div>

    }
}

export default Login;