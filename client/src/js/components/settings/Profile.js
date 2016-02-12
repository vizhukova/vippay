import React from 'react';
import SettingsAction from'./../../actions/SettingsAction'
import SettingsStore from'./../../stores/SettingsStore';
import Alert from'./../../../../../common/js/Alert';
import _ from 'lodash';


class Profile extends React.Component {

    constructor(){
        super();
        this.state={
            old_password: '',
            new_password: '',
            confirm_new_password: '',
            error: {}

        };
        this.update = this.update.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkFields = this.checkFields.bind(this);

    }

    componentDidMount() {
        SettingsAction.getFee();
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
        if(! this.checkFields() ) {
            this.setState({
                    error: {
                        type: 'error',
                        title: 'Ошибка',
                        text: 'Проверьте заполнение всех полей или новый пароль и подтверждение не совпадают.'
                    }
                })
        } else {
            SettingsAction.setNewPassword({old_pass: this.state.old_password, new_pass: this.state.new_password})
                .then((data) => {
                    this.setState({
                    error: {
                        type: 'success',
                        title: 'Успех',
                        text: 'Пароль установлен.'
                    }
                })
                }).catch((err) =>  {
                 this.setState({
                    error: {
                        type: 'error',
                        title: 'Ошибка',
                        text: 'Проверьте правильность написания старого пароля.'
                    }
                })
            })
        }
    }

    checkFields() {
           [this.state.old_password, this.state.new_password, this.state.confirm_new_password]
            .map((item) => {
                if(_.trim(item).length <= 0) return false;
            })
        if(this.state.new_password !== this.state.confirm_new_password) return false;
        return true;
    }

    onClick() {
        this.setState({error: {}});
    }

    onChange(e) {
        this.state[e.target.name] = e.target.value;
        this.setState({})
    }


    render(){
        var self = this;
        return <form className="col-sm-12 form-ui table-wrapper" onSubmit={this.onSubmit}>
                <Alert type={this.state.error.type} text={this.state.error.text} title={this.state.error.title} />
                    <h3>Настройки профиля</h3>
                     <fieldset className="product-form">

                         <label className="text-warning">Старый пароль</label>
                         <input type="text" name="old_password"
                               className="form-control" id="name"
                               placeholder="Введите старый пароль"
                               onChange = {this.onChange}
                               onClick = {this.onClick}
                               />

                         <label className="text-warning">Новый пароль</label>
                         <input type="text" name="new_password"
                               className="form-control" id="name"
                               placeholder="Введите новый пароль"
                                onChange = {this.onChange}
                                onClick = {this.onClick}
                               />

                         <label className="text-warning">Подтвердите новый пароль</label>
                         <input type="text" name="confirm_new_password"
                               className="form-control" id="name"
                               placeholder="Введите новый пароль повторно"
                                onChange = {this.onChange}
                                onClick = {this.onClick}
                               />
                     </fieldset>

                     <button type="button" className="btn btn-danger pull-right btn-submit">
                         Отмена
                     </button>

                     <input type="submit" className="btn btn-warning pull-left btn-submit" value="Сохранить"/>
                </form>


    }


}


export default Profile;