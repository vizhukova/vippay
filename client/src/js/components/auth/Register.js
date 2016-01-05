import React from 'react'
import ApiActions from './../../actions/ApiActions'


class Register extends React.Component {

    constructor() {
        super();
		this.onChange = this.onChange.bind(this);
		this.register = this.register.bind(this);

        /*this.state = {
			errors: {
				login: [
					"Такой логин уже существует",
					"Поле 'логин' не может быть пустым",
					"Слишком длинный логин"
				],
				password: [
					"Пароли не совпадают",
					"Поле 'пароль' не может быть пустым",
					"Слишком длинный пароль"
				],
				name: [
					"Поле 'ФИО' не может быть пустым",
					"Слишком длинное ФИО"
				],
				email: [
					"Не верный формат email",
					"Поле 'электронная почта' не может быть пустым",
					"Слишком длинная электронная почта"
				]
			}
		};*/
    }

	onChange(e){
        console.log(e.target.name)
		console.log(e.target.value)

		var state = {};

		state[e.target.name] = e.target.value;
		this.setState(state);
    }

	register() {
		debugger
		console.log('!!!')
		console.log(this.state)
        ApiActions.post('register', this.state)
			.then(function(data){console.log(data)})
			.catch(function(err){console.log(err + 'error')})
    }

    render() {
        return <div>
            <div className="form-group">
				<input type="text" name="login" id="login" className="form-control input-lg" onChange={this.onChange} placeholder="Логин" tabIndex="1"  required/>
			</div>
			<div className="form-group">
				<input type="text" name="name" id="full_name" className="form-control input-lg" onChange={this.onChange} placeholder="ФИО" tabIndex="2" />
			</div>
			<div className="form-group">
				<input type="email" name="email" id="email" className="form-control input-lg" onChange={this.onChange} placeholder="Электронная почта" tabIndex="3" required />
			</div>
			<div className="row">
				<div className="col-xs-6 col-sm-6 col-md-6">
					<div className="form-group">
						<input type="password" name="password" id="password" className="form-control input-lg" onChange={this.onChange} placeholder="Пароль" tabIndex="4" />
					</div>
				</div>
				<div className="col-xs-6 col-sm-6 col-md-6">
					<div className="form-group">
						<input type="password" name="password_confirm" id="password_confirm" className="form-control input-lg" onChange={this.onChange} placeholder="Подтвердите пароль" tabIndex="5" />
					</div>
				</div>
			</div>
			<div className="btn btn-primary btn-block" onClick={this.register}>Отправить</div>
            </div>
    }
}

export default Register;