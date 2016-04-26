import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import AlertActions from'./../../../../../../common/js/Alert/AlertActions';
import SettingsAction from './../../../actions/SettingsAction';
import StaffStore from './../../../stores/StaffStore';
import PasswordInput from './../../../../../../common/js/PasswordInput';
import LoginInput from './../../../../../../common/js/LoginInput';
import _ from 'lodash';

class formStaff extends React.Component {

    constructor() {
        super();
        this.state = _.clone(StaffStore.getState());

        this.update = this.update.bind(this);
        this.add = this.add.bind(this);
        this.edit = this.edit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.checkFields = this.checkFields.bind(this);
        this.onRouteChange = this.onRouteChange.bind(this);

    }

    componentDidMount() {
        StaffStore.listen(this.update);

        if(this.props.params.id) {
            SettingsAction.getStaffById(this.props.params.id);
            SettingsAction.getRoutesById(this.props.params.id);
        } else {
            SettingsAction.clear();
        }

    }

    componentWillReceiveProps(props) {
         if(props.params.id) {
            SettingsAction.getStaffById(props.params.id);
            SettingsAction.getRoutesById(this.props.params.id);
        } else {
            SettingsAction.clear();
        }
    }

    componentWillUnmount() {
        StaffStore.unlisten(this.update);
        //console.log(StaffStore.getState())
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

        SettingsAction.addStaff({staff: this.state.staff, routes: this.state.routes}).then(() => {
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

        SettingsAction.setStaff({staff: this.state.staff, routes: this.state.routes}).then(() => {
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

    onRouteChange(e) {
        this.state.routes[e.target.id].action  = e.target.value;
        this.setState({});
    }


    render() {
        var self = this;
        
        return <div className="col-sm-7 form-ui table-wrapper">
                    <div className="form-group">
                        <h3>{this.props.params.id ? 'Форма редактирования сотрудника' : 'Форма создания сотрудника'}</h3>
                        <fieldset disabled={this.props.params.id}>
                            <label>Логин {this.props.params.id ? <span className="text-danger"> (это поле не редактируемо) </span> : <span className="text-danger"> * </span>}</label>
                            <LoginInput type='text' className="form-control" name="login"
                                   value={this.state.staff.login}
                                   onChange={this.onChange}
                                   onClick={this.onClick}
                                    />
                            </fieldset>

                            <fieldset>
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

                        <fieldset>
                            <h4>Права доступа</h4>
                            <div className="row">
                             <label className="col-md-4 col-sm-4">Редактирование</label>
                             <label className="col-md-4 col-sm-4">Только чтение</label>
                             <label></label>
                            </div>
                            {this.state.routes.map((item, index) => {

                                var name = _.findWhere(self.state.routeNames, {route: item.route}).name;

                                return <div key={index} className="row">
                                    <label className="col-md-4 col-sm-4">
                                      <input type="radio"  id={index} value="write"
                                             name={item.route}
                                             onChange={self.onRouteChange}
                                             checked={item.action == 'write'} />
                                    </label>
                                    <label className="col-md-4 col-sm-4">
                                      <input type="radio" id={index} value="read"
                                             name={item.route}
                                             onChange={self.onRouteChange}
                                             checked={item.action == 'read'}/>
                                    </label>
                                    <label>{name}</label>
                                </div>
                            })}
                        </fieldset>

                         <fieldset><div className="text-danger small">*Поля обязательные для заполнения</div></fieldset>

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