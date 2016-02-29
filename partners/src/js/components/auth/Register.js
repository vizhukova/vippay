import React from 'react'
import ApiActions from './../../actions/ApiActions'
import PasswordInput from './../../../../../common/js/PasswordInput';
import Alert from './../../../../../common/js/Alert/Alert'
import AlertActions from './../../../../../common/js/Alert/AlertActions'


class Register extends React.Component {

    constructor() {
        super();
		this.onChange = this.onChange.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.register = this.register.bind(this);
		this.state = {
			errors: {}
		};
    }

	componentDidMount() {
		var id = location.hash.slice(location.hash.lastIndexOf('/') + 1, location.hash.lastIndexOf('?'));
		this.setState({client_id: id});
		localStorage.setItem('current_client_id', id);
	}

	onChange(e){
		var state = {};
		state[e.target.name] = e.target.value;
		this.setState(state);
    }

	onClick(e) {
        AlertActions.hide();
    }

	onKeyDown(e) {
		if(e.keyCode == 13) {
            this.register();
        }
	}

	register() {

		var self = this;
		if(!this.isCorrectField()) {
			this.setState({});
			return;
		}
        ApiActions.post('partner/register', this.state)
			.then(function(obj){
				var data = obj.user;
				console.log('Token: ' + data.token);
                //cookie.setCookie('token', data.user.token, {
                //    domain: '.vippay.loc'
                //});

				location.href = obj.redirect;
			})
    }

	isCorrectField() {
		var empty = false;
		if(!this.state.login || this.state.login.length == 0) {this.state.errors.login = ["Поле 'логин' должно быть заполнено"]; empty = true;}
		if(!this.state.name || this.state.name.length == 0) {this.state.errors.name = ["Поле 'ФИО' должно быть заполнено"]; empty = true;}
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

		if(this.state.password !== this.state.confirm_pass) {
			AlertActions.set({
                    type: 'error',
                    title: 'Ошибка',
                    text: 'Пароли не совпадают'
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
				<input type="text" name="login" id="login"
					   className={this.state.errors.login ? `${baseClass} invalid` : baseClass}
					   onChange={this.onChange}
					   onClick={this.onClick}
					   onKeyDown={this.onKeyDown}
					   placeholder="Логин" tabIndex="3"  required/>
			</div>
			<div className="form-group">
				<input type="text" name="name" id="full_name"
					   className={this.state.errors.name ? `${baseClass} invalid` : baseClass}
					   onChange={this.onChange}
					   onClick={this.onClick}
					   onKeyDown={this.onKeyDown}
					   placeholder="ФИО" tabIndex="4" />
			</div>
			<div className="form-group">
				<input type="email" name="email" id="email"
					   className={this.state.errors.email ? `${baseClass} invalid` : baseClass}
					   onChange={this.onChange}
					   onKeyDown={this.onKeyDown}
					   onClick={this.onClick} placeholder="Электронная почта" tabIndex="5" required />
			</div>
			<div className="row">
				<div className="col-lg-6 col-sm-12 col-md-6">
					<PasswordInput
							name="password"
							id="password"
							class={this.state.errors.password ? `${baseClass} invalid` : baseClass}
							onChange={this.onChange}
							onKeyDown={this.onKeyDown}
							tabIndex="6"
							onClick={this.onClick} placeholder="Пароль"/>
				</div>
				<div className="col-lg-6 col-sm-12 col-md-6">
					<PasswordInput
							name="confirm_pass"
							id="confirm_pass"
							class={this.state.errors.password ? `${baseClass} invalid` : baseClass}
							onChange={this.onChange}
							onKeyDown={this.onKeyDown}
							tabIndex="7"
							onClick={this.onClick} placeholder="Подтвердите"/>
				</div>
			</div>
			<div className="btn btn-primary btn-block" tabIndex="8" onClick={this.register} onKeyDown={this.onKeyDown}>Отправить</div>
            </div>
    }
}

export default Register;