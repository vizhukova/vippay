import React from 'react';
import AlertActions from'./../../../../../common/js/Alert/AlertActions';
import _ from 'lodash';

class formStaff extends React.Component {

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

        this.update = this.update.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkFields = this.checkFields.bind(this);
        this.cancel = this.cancel.bind(this);

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    update(state) {
        this.setState(state);
    }


    checkFields() {

    }

    onClick() {
        AlertActions.hide();
    }

    onChange(e) {
        this.state[e.target.name] = e.target.value;
        this.setState({});
    }


    render() {
        console.log('Profile render: ', this.state)
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


export default formStaff;