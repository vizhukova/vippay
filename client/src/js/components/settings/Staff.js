import React from 'react';
import AlertActions from'./../../../../../common/js/Alert/AlertActions';
import SettingsAction from './../../actions/SettingsAction';
import SettingsStore from './../../stores/SettingsStore';
import _ from 'lodash';


class StaffItem extends React.Component {
    constructor() {
        super();
        this.state= {};
    }

    render() {

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
        SettingsStore.listen(this.update)
        SettingsAction.getStaffs();
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

        return <List
            title="Сотрудники"
            add_link="/staff/new"
            add_link_name = 'Добавить сотрудника'
            items={this.state.staffs}
            itemComponent={StaffItem}
            isPaginate={true}
        />


    }


}


export default Staff;