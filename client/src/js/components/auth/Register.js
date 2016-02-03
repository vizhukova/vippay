import React from 'react'
import ApiActions from './../../actions/ApiActions'

import PasswordInput from './../ui/PasswordInput';


class Register extends React.Component {

    constructor() {
        super();
		this.onChange = this.onChange.bind(this);
		this.register = this.register.bind(this);
		this.state = {errors: {}};
    }

	onChange(e){
		var state = {};
		console.log(e.target.name)
		state[e.target.name] = e.target.value;
		this.setState(state);
    }

	register() {

		var self = this;
		if(!this.isCorrectField()) {
			this.setState({});
			return;
		}

        ApiActions.post('client/register', this.state)
			.then(function(data){
				console.log(data)
				console.log('Token: ' + data.token);
				localStorage.setItem('token', data.token);
				location.assign('http://' + data.domain)
				//location.hash = '';
			})
			.catch(function(err){
				console.log('error');
			})
    }

	isCorrectField() {
		var empty = false;
		if(!this.state.login || this.state.login.length == 0) {this.state.errors.login = ["Поле 'логин' должно быть заполнено"]; empty = true;}
		if(!this.state.name || this.state.name.length == 0) {this.state.errors.name = ["Поле 'ФИО' должно быть заполнено"]; empty = true;}
		if(!this.state.email || this.state.email.length == 0) {this.state.errors.email = ["Поле 'электронная почта' должно быть заполнено"]; empty = true;}
		if(!this.state.password || this.state.password.length == 0) {this.state.errors.password = ["Поле 'пароль' должно быть заполнено"]; empty = true;}

		if( empty ) {
			//alert('Все поля должны быть заполнены');
			return false;
		}

		if(this.state.password !== this.state.confirm_pass) {
			//alert('Пароли не совпадают');
			return false;
		}

		return true;
	}

    render() {
		var baseClass = "form-control input-lg";

        return <div>
            <div className="form-group">
				<input type="text" name="login" id="login" className={this.state.errors.login ? `${baseClass} invalid` : baseClass} onChange={this.onChange} placeholder="Логин" tabIndex="1"  required/>
			</div>
			<div className="form-group">
				<input type="text" name="name" id="full_name" className={this.state.errors.name ? `${baseClass} invalid` : baseClass} onChange={this.onChange} placeholder="ФИО" tabIndex="2" />
			</div>
			<div className="form-group">
				<input type="email" name="email" id="email" className={this.state.errors.email ? `${baseClass} invalid` : baseClass}  onChange={this.onChange} placeholder="Электронная почта" tabIndex="3" required />
			</div>
			<div className="row">
				<div className="col-lg-6 col-sm-12 col-md-6">
					<PasswordInput
							name="password"
							id="password"
							class={this.state.errors.password ? `${baseClass} invalid` : baseClass}
							onChange={this.onChange} placeholder="Пароль"/>
				</div>
				<div className="col-lg-6 col-sm-12 col-md-6">
					<PasswordInput
							name="confirm_pass"
							id="confirm_pass"
							class={this.state.errors.password ? `${baseClass} invalid` : baseClass}
							onChange={this.onChange} placeholder="Подтвердите"/>
				</div>
			</div>
			<div className="btn btn-primary btn-block" onClick={this.register}>Отправить</div>
            </div>
    }
}

export default Register;