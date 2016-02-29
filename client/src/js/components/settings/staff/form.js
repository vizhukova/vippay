import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import AlertActions from'./../../../../../../common/js/Alert/AlertActions';
import SettingsAction from './../../../actions/SettingsAction';
import SettingsStore from './../../../stores/SettingsStore';
import PasswordInput from './../../../../../../common/js/PasswordInput';
import LoginInput from './../../../../../../common/js/LoginInput';
import _ from 'lodash';

class formStaff extends React.Component {

    constructor() {
        super();
        this.state = SettingsStore.getState();

        _.assign(this.state.staff, {active: true});

        this.update = this.update.bind(this);
        this.add = this.add.bind(this);
        this.edit = this.edit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.checkFields = this.checkFields.bind(this);

    }

    componentDidMount() {
        SettingsStore.listen(this.update);

        if(this.props.params.id) {
            SettingsAction.getStaffById(this.props.params.id);
        } else {
            this.state.staff = {
                active: true
            };
            this.setState({});
        }
    }

    componentWillReceiveProps(props) {
         if(props.params.id) {
            SettingsAction.getStaffById(props.params.id);
        } else {
            this.state.staff = {
                active: true
            };
            this.setState({});
        }
    }

    componentWillUnmount() {
        SettingsStore.unlisten(this.update);
    }

    update(state) {
        this.setState(state);
    }

    add() {
        if(! this.checkFields()) {
            AlertActions.set({
               type: 'error',
                title: 'Ошибка',
                text: 'Все поля должны быть заполнены'
            }, true);
            return;
        }

        SettingsAction.addStaff(this.state.staff).then(() => {
            history.back();
        })
    }

    edit() {
         if(! this.checkFields()) {
            AlertActions.set({
               type: 'error',
                title: 'Ошибка',
                text: 'Все поля должны быть заполнены'
            }, true);
            return;
        }

        SettingsAction.setStaff(this.state.staff).then(() => {
            history.back();
        })
    }


    checkFields() {
        return this.state.staff.login && _.trim(this.state.staff.login).length &&
                this.state.staff.email && _.trim(this.state.staff.email).length &&
                this.state.staff.password && _.trim(this.state.staff.password).length;
    }

    onClick() {
        AlertActions.hide();
    }

    onChange(e) {
        var state = {};

        if(e.target.name == "active")  state[e.target.name] =  e.target.checked;
        else state[e.target.name] = e.target.value;

        _.assign(this.state.staff, state);
        this.setState({});
    }


    render() {

        return <div className="col-sm-7 form-ui table-wrapper">
                    <div className="form-group">
                        <h3>{this.props.params.id ? 'Форма редактирования сотрудника' : 'Форма создания сотрудника'}</h3>
                        <fieldset>
                            <label>Логин {this.props.params.id ? <span className="text-danger"> (это поле не редактируемо) </span> : <span className="text-danger"> * </span>}</label>
                            <LoginInput type='text' className="form-control" name="login"
                                   value={this.state.staff.login}
                                   onChange={this.onChange}
                                   onClick={this.onClick}
                                    notEditable={this.props.params.id ? true : false}/>

                            <label>Пароль<span className="text-danger"> * </span></label>
                            <input type='text' className="form-control" name="password"
                                   placeholder="Пароль"
                                   value={this.state.staff.password}
                                   onChange={this.onChange}
                                   onClick={this.onClick}/>

                            <div className="checkbox">
                              <label className="text-warning">
                                  <input name="active"
                                         checked={this.state.staff.active}
                                         type="checkbox"
                                         onChange={this.onChange}
                                         onClick = {this.onClick}/>
                                  Активность</label>
                            </div>

                            <label>Роль</label>
                            <input type='text' className="form-control" name="role"
                                   placeholder="Роль"
                                   value={this.state.staff.role}
                                   onChange={this.onChange}
                                   onClick={this.onClick}/>

                            <label>Почта<span className="text-danger"> * </span></label>
                            <input type='text' className="form-control" name="email"
                                   placeholder="Электронная почта"
                                   value={this.state.staff.email}
                                   onChange={this.onChange}
                                   onClick={this.onClick}/>
                        </fieldset>
                         <button type="button" className="btn btn-submit pull-left"
                                onClick={this.props.params.id  ? this.edit : this.add}>{
                           this.props.params.id  ? "Редактировать" : "Добавить"}
                        </button>

                        <Link to="/staff" activeClassName="active">
                            <div className="btn btn-submit pull-right">Отмена</div>
                        </Link>

                    </div>
            </div>


    }


}


export default formStaff;