import React from 'react';
import SettingsAction from'./../actions/SettingsActions'
import SettingsStore from'./../stores/SettingsStore';
import AlertActions from'./../../../../common/js/Alert/AlertActions';
import _ from 'lodash';


class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
            old_password: '',
            new_password: '',
            confirm_new_password: ''
        };
        this.update = this.update.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkFields = this.checkFields.bind(this);

    }

    componentDidMount() {
        SettingsStore.listen(this.update)
    }

    componentWillUnmount() {
        SettingsStore.unlisten(this.update)
    }

    update(state) {
        this.setState(state);
    }

    onSubmit(e) {
        e.preventDefault();
        if (!this.checkFields()) {
            AlertActions.set({
                type: 'error',
                title: 'Ошибка',
                text: 'Проверьте заполнение всех полей или новый пароль и подтверждение не совпадают.'
            })
        } else {
            SettingsAction.setNewPassword({old_pass: this.state.old_password, new_pass: this.state.new_password})
                .then((data) => {
                    AlertActions.set({
                        type: 'success',
                        title: '',
                        text: 'Пароль установлен.'
                    })
                }).catch((err) => {
                AlertActions.set({
                    type: 'error',
                    title: 'Ошибка',
                    text: 'Проверьте правильность написания старого пароля.'
                })
            })
        }
    }

    checkFields() {
        var result = [this.state.old_password, this.state.new_password, this.state.confirm_new_password]
            .filter((item) => {
                return _.trim(item).length <= 0
            })
        if (result.length > 0) return false;
        if (this.state.new_password !== this.state.confirm_new_password) return false;
        return true;
    }

    onClick() {
        AlertActions.hide();
    }

    onChange(e) {
        this.state[e.target.name] = e.target.value;
        this.setState({})
    }


    render() {
        var self = this;
        return <div>
                <form className="col-sm-12 form-ui block boxed" onSubmit={this.onSubmit}>
                <h3 className="block-title">Настройки профиля</h3>
                <fieldset className="block-inner">

                    <label className="text-warning">Старый пароль</label>
                    <input type="text" name="old_password"
                           className="form-control" id="name"
                           placeholder="Введите старый пароль"
                           onChange={this.onChange}
                           onClick={this.onClick}
                    />

                    <label className="text-warning">Новый пароль</label>
                    <input type="text" name="new_password"
                           className="form-control" id="name"
                           placeholder="Введите новый пароль"
                           onChange={this.onChange}
                           onClick={this.onClick}
                    />

                    <label className="text-warning">Подтвердите новый пароль</label>
                    <input type="text" name="confirm_new_password"
                           className="form-control" id="name"
                           placeholder="Введите новый пароль повторно"
                           onChange={this.onChange}
                           onClick={this.onClick}
                    />
                </fieldset>
                <div className="row-footer clearfix">
                    <button type="button" className="btn btn-danger pull-right btn-submit">
                        Отмена
                    </button>

                    <input type="submit" className="btn btn-warning pull-left btn-submit" value="Сохранить"/>
                </div>
            </form>
        </div>


    }


}


export default Profile;