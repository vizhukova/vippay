import React from 'react';
import ApiActions from './../../../../../partners/src/js/actions/ApiActions';
import Alert from './../../../../../common/js/Alert/Alert';
import AlertActions from './../../../../../common/js/Alert/AlertActions';
import PasswordInput from './../../../../../common/js/PasswordInput';
import cookie from'./../../../../../common/Cookies';


class Staff extends React.Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.login = this.login.bind(this);
        this.state = {};
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
            this.login();
        }
	}

    login() {
        var self = this;
        if(!this.isCorrectField()) {
            this.setState({});
            return;
        }

        ApiActions.post('staff/login', this.state)
            .then(function(data){
                location.href = data.redirect;
            })
    }

    isCorrectField() {
        var empty = false;

        if(!this.state.email || this.state.email.length == 0) {empty = true;}
        if(!this.state.password || this.state.password.length == 0) {empty = true;}

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
                       className={baseClass}
                       onChange={this.onChange}
                       onKeyDown={this.onKeyDown}
                       onClick={this.onClick} placeholder="Электронная почта" tabIndex="3" />
			</div>
            <div className="form-group">
				<PasswordInput
							name="password"
							id="password"
							class={baseClass}
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

export default Staff;