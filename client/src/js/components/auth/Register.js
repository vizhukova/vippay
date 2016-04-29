import React from 'react'
import ApiActions from './../../actions/ApiActions'
import PasswordInput from './../../../../../common/js/PasswordInput';
import LoginInput from './../../../../../common/js/LoginInput';
import Alert from './../../../../../common/js/Alert/Alert';
import AlertActions from './../../../../../common/js/Alert/AlertActions';


/**
 * компонент формы регистрации клиента
 */
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

    onChange(e) {
        var state = {};
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onKeyDown(e) {
        if (e.keyCode == 13) {
            this.register();
        }
    }

    onClick(e) {
        AlertActions.hide();
    }

    register() {

        var self = this;
        if (!this.isCorrectField()) {
            this.setState({});
            return;
        }

        ApiActions.post('client/register', this.state)
            .then(function (data) {
                //console.log('Token: ' + data.token);
                location.assign('http://' + data.domain)
            })
    }

    /**
     * Валидация
     * @returns {boolean}
     */
    isCorrectField() {
        var empty = false;
        if (!this.state.login || this.state.login.length == 0) {
            this.state.errors.login = ["Поле 'логин' должно быть заполнено"];
            empty = true;
        }
        if (!this.state.name || this.state.name.length == 0) {
            this.state.errors.name = ["Поле 'ФИО' должно быть заполнено"];
            empty = true;
        }
        if (!this.state.email || this.state.email.length == 0) {
            this.state.errors.email = ["Поле 'электронная почта' должно быть заполнено"];
            empty = true;
        }
        if (!this.state.password || this.state.password.length == 0) {
            this.state.errors.password = ["Поле 'пароль' должно быть заполнено"];
            empty = true;
        }

        if (empty) {
            AlertActions.set({
                type: 'error',
                title: 'Ошибка',
                text: 'Все поля должны быть заполнены'
            })
            return false;
        }

        if (this.state.password !== this.state.confirm_pass) {
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
                <LoginInput
                    class={this.state.errors.login ? `${baseClass} invalid` : baseClass}
                    tabIndex="3"
                    onKeyDown={this.onKeyDown}
                    onChange={this.onChange}
                    onClick={this.onClick}
                />
            </div>
            <div className="form-group">
                <input type="text" name="name" id="full_name"
                       className={this.state.errors.name ? `${baseClass} invalid` : baseClass}
                       onKeyDown={this.onKeyDown}
                       onChange={this.onChange}
                       onClick={this.onClick}
                       placeholder="ФИО" tabIndex="4"/>
            </div>
            <div className="form-group">
                <input type="email" name="email" id="email"
                       className={this.state.errors.email ? `${baseClass} invalid` : baseClass}
                       onKeyDown={this.onKeyDown}
                       onChange={this.onChange}
                       onClick={this.onClick}
                       placeholder="Электронная почта" tabIndex="5" required/>
            </div>
            <div className="row">
                <div className="col-lg-6 col-sm-12 col-md-6">
                    <PasswordInput
                        name="password"
                        id="password"
                        class={this.state.errors.password ? `${baseClass} invalid` : baseClass}
                        onKeyDown={this.onKeyDown}
                        onChange={this.onChange}
                        onClick={this.onClick} placeholder="Пароль" tabIndex="6"/>
                </div>
                <div className="col-lg-6 col-sm-12 col-md-6">
                    <PasswordInput
                        name="confirm_pass"
                        id="confirm_pass"
                        class={this.state.errors.password ? `${baseClass} invalid` : baseClass}
                        onKeyDown={this.onKeyDown}
                        onChange={this.onChange}
                        onClick={this.onClick} placeholder="Подтвердите" tabIndex="7"/>
                </div>
            </div>
            <div className="btn btn-primary btn-block" tabIndex="8" onClick={this.register} onKeyDown={this.onKeyDown}>
                Отправить
            </div>
        </div>
    }
}

export default Register;