import React from 'react';
import PartnersActions from'./../actions/PartnersActions';
import PartnersStore from'./../stores/PartnersStore';
import SettingsStore from'./../stores/SettingsStore';
import List from'./../../../../common/js/List';
import _ from 'lodash';

/**
 * Элемент списка партнеров второго уровня
 */
class SecondaryPartner extends React.Component {

    constructor() {
        super();
        this.state = {}
    }

    render() {

        return <tr>
                <td>{this.props.item.login}</td>
                <td>{this.props.item.email}</td>
                <td>{this.props.item.name}</td>
            </tr>

    }
}

/**
 * Список партнеров второго уровня
 */
class SecondaryPartners extends React.Component {

    constructor(){
        super();
        this.state = _.assign({}, PartnersStore.getState(), SettingsStore.getState());
        this.update = this.update.bind(this);
        this.settingsUpdate = this.settingsUpdate.bind(this);
    }

    componentDidMount() {
        PartnersStore.listen(this.update);
        SettingsStore.listen(this.settingsUpdate);
        if(this.state.partner.id) PartnersActions.getById(this.state.partner.id);
    }

    componentWillUnmount() {
        PartnersStore.unlisten(this.update);
        SettingsStore.unlisten(this.settingsUpdate);
    }

    update(state) {
        this.setState(state);
    }

    settingsUpdate(state) {
        this.setState(state);
        if(this.state.partner.id) PartnersActions.getById(this.state.partner.id);
    }


    render(){

        return <List
            title="Партнеры второго уровня"
            items={this.state.partners_secondary}
            itemComponent={SecondaryPartner}
            isPaginate={true}
            thead={[
                {name: 'Логин', key: 'login'},
                {name: 'Электронная почта', key: 'email'},
                {name: 'ФИО', key: 'name'}
            ]}
            />

    }


}


export default SecondaryPartners;
