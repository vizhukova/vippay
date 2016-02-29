import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import AlertActions from'./../../../../../../common/js/Alert/AlertActions';
import SettingsAction from './../../../actions/SettingsAction';
import SettingsStore from './../../../stores/SettingsStore';
import List from'./../../../../../../common/js/List';
import _ from 'lodash';


class StaffItem extends React.Component {
    constructor() {
        super();
        this.state= {};
        this.setAvailable = this.setAvailable.bind(this);
        this.remove = this.remove.bind(this);
    }

    setAvailable() {
        SettingsAction.setStaff({active: !this.props.item.active, id: this.props.item.id});
    }

    remove() {
        SettingsAction.deleteStaff({id: this.props.item.id});
    }

    render() {
        var available = "glyphicon glyphicon-ok-circle btn btn-default btn-action";
        var notAvailable = "glyphicon glyphicon-ban-circle btn btn-danger btn-action";

        return <tr>
            <td>{this.props.item.login}</td>
            <td>{this.props.item.email}</td>
            <td className="action"><button type="button" className={this.props.item.active ? available : notAvailable} onClick={this.setAvailable} /></td>
             <td className="action">
                        <Link to={`/staff/${this.props.item.id}`}
                              className={`btn btn-default btn-action glyphicon glyphicon-pencil`}/>
                        <button type="button" className={`btn btn-danger btn-action pull-right glyphicon glyphicon-remove`} onClick={this.remove} />
             </td>
        </tr>
    }
}
class Staff extends React.Component {

    constructor() {
        super();
        this.state = SettingsStore.getState();

        this.update = this.update.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.checkFields = this.checkFields.bind(this);

    }

    componentDidMount() {
        SettingsStore.listen(this.update);
        SettingsAction.getStaffs();
    }

    componentWillUnmount() {
        SettingsStore.unlisten(this.update);
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

        return <List
            title="Сотрудники"
            add_link="/staff/new"
            add_link_name = 'Добавить сотрудника'
            items={this.state.staffs}
            itemComponent={StaffItem}
            isPaginate={true}
            thead={[
                {name: 'Логин', key: 'login'},
                {name: 'Электронная почта', key: ''},
                {name: 'Активность', key: 'active'},
                {name: '', key: ''}
            ]}
        />


    }


}


export default Staff;