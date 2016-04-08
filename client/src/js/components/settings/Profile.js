import React from 'react';
import SettingsAction from'./../../actions/SettingsAction'
import SettingsStore from'./../../stores/SettingsStore';
import AuthStore from'./../../stores/AuthStore';
import AlertActions from'./../../../../../common/js/Alert/AlertActions';
import Select from'./../../../../../common/js/Select';
import _ from 'lodash';
import Pricing from './Pricing'

class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
            old_password: '',
            new_password: '',
            confirm_new_password: '',
            tariff: {},
            currentTariff: {},
            user: {}
        };
        _.assign(this.state, AuthStore.getState());

        this.update = this.update.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkFields = this.checkFields.bind(this);
        this.cancel = this.cancel.bind(this);

    }

    componentDidMount() {
        SettingsStore.listen(this.update);
        AuthStore.listen(this.update);
    }

    componentWillUnmount() {
        SettingsStore.unlisten(this.update);
        AuthStore.unlisten(this.update);
    }

    update(state) {
        this.setState(state);
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.checkFields()) {

            AlertActions.hide();

            SettingsAction.setNewPassword({old_pass: this.state.old_password, new_pass: this.state.new_password})
                .then((data) => {
                    AlertActions.set({
                        type: 'success',
                        title: '',
                        text: 'Пароль установлен.'
                    }, true);
                })
        }
    }

    checkFields() {
        var result = [this.state.old_password, this.state.new_password, this.state.confirm_new_password]
            .filter((item) => {
                return _.trim(item).length <= 0
            });
        if (result.length > 0) {
            AlertActions.set({
                type: 'error',
                title: 'Ошибка',
                text: 'Проверьте заполнение всех полей'
            }, true);
            return false;
        }
        if (this.state.new_password !== this.state.confirm_new_password) {
            AlertActions.set({
                type: 'error',
                title: 'Ошибка',
                text: 'Новый пароль и его подтверждение не совпадают'
            }, true);
            return false;
        }
        return true;
    }

    onClick() {
        AlertActions.hide();
    }

    cancel() {
        this.state.old_password = this.state.new_password = this.state.confirm_new_password = '';
        this.setState({});
        AlertActions.hide();
    }

    onChange(e) {
        this.state[e.target.name] = e.target.value;
        this.setState({});
    }


    render() {
        console.log('Profile render: ', this.state);
        var arr = location.host.split('.');
        var paymentDomain = `http://payment.${arr[1]}.${arr[2]}/checkout`;
        var self = this;
        return <div>
            <form className="col-sm-12 form-ui block boxed" onSubmit={this.onSubmit}>

                <h3 className="block-title">Информация пользователя</h3>
                <ul className="profile-list">
                    <li>Логин: {this.state.user.login}</li>
                    <li>ФИО: {this.state.user.name}</li>
                    <li>Электронная почта: {this.state.user.email}</li>

                </ul>

                <h3 className="block-title">Настройки профиля</h3>
                <fieldset className="block-inner">

                    <label className="text-warning">Старый пароль</label>
                    <input type="text" name="old_password"
                           className="form-control" id="name"
                           placeholder="Введите старый пароль"
                           value={this.state.old_password}
                           onChange={this.onChange}
                           onClick={this.onClick}
                    />

                    <label className="text-warning">Новый пароль</label>
                    <input type="text" name="new_password"
                           className="form-control" id="name"
                           placeholder="Введите новый пароль"
                           value={this.state.new_password}
                           onChange={this.onChange}
                           onClick={this.onClick}
                    />

                    <label className="text-warning">Подтвердите новый пароль</label>
                    <input type="text" name="confirm_new_password"
                           className="form-control" id="name"
                           placeholder="Введите новый пароль повторно"
                           value={this.state.confirm_new_password}
                           onChange={this.onChange}
                           onClick={this.onClick}
                    />
                </fieldset>
                <fieldset>
                    <div className="boxed">
                        <a className="btn btn-block" href={paymentDomain}> Выбор тарифа</a>
                    </div>
                </fieldset>
                <div className="row-footer clearfix">
                    <input type="submit" className="btn btn-warning pull-left btn-submit" value="Сохранить"/>
                    <button type="button" className="btn btn-danger pull-right btn-submit" onClick={this.cancel}>
                        Отмена
                    </button>
                </div>

            </form>

        </div>


    }


}


export default Profile;