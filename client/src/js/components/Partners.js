import React from 'react';
import PartnersAction from './../actions/PartnersAction';
import AuthAction from './../actions/AuthActions';
import PartnersStore from './../stores/PartnersStore';
import List from'./../../../../common/js/List';
import _  from 'lodash';


class PartnerItem extends React.Component {

    constructor(){
        super();
        this.setActive = this.setActive.bind(this);
    }

    setActive() {
        var partner = _.cloneDeep(this.props.item);
        partner.active = !partner.active;
        PartnersAction.edit(partner);
    }

    login(e){
        e.preventDefault();
        AuthAction.guestLogin(e.target.dataset.login).then(() => {
            location = '/partner'
        });
    }

    render(){
        var available = "glyphicon glyphicon-ok-circle";
        var notAvailable = "glyphicon glyphicon-ban-circle";

        return <tr>
                <td>{this.props.item.login}</td>
                <td>{this.props.item.email}</td>
                <td>{this.props.item.name}</td>
                <td><button type="button" className={this.props.item.active ? `btn btn-default btn-action ${available}` : `btn btn-default btn-action ${notAvailable}`} onClick={this.setActive}></button></td>
            </tr>
    }


}

class Partners extends React.Component {

    constructor(){
        super();
        this.state = PartnersStore.getState();

        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.setState({sort: ''});
        PartnersAction.getAll();
        PartnersStore.listen(this.update)
    }

    componentWillUnmount() {
        PartnersStore.unlisten(this.update)
    }

    update(state) {
        this.setState(state);
    }


    render(){
        var self = this;

        return  <List
            title="Партнеры"
            error={this.state.error}
            items={this.state.partners}
            perPage={4}
            sort={this.sort}
            itemComponent={PartnerItem}
            isPaginate={true}
            thead={[
                {name: 'Логин', key: 'login'},
                {name: 'Электронная почта', key: 'email'},
                {name: 'ФИО', key: 'name'},
                {name: 'Активность', key: 'active'}
            ]}
        />

    }


}


export default Partners;
