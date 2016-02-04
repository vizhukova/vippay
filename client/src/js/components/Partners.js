import React from 'react';
import PartnersAction from './../actions/PartnersAction';
import AuthAction from './../actions/AuthActions';
import PartnersStore from './../stores/PartnersStore';
import _  from 'lodash';


class PartnerItem extends React.Component {

    constructor(){
        super();
        this.setActive = this.setActive.bind(this);
    }

    setActive() {
        var partner = _.cloneDeep(this.props.partner);
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
                <td>{this.props.partner.login}</td>
                <td>{this.props.partner.email}</td>
                <td>{this.props.partner.name}</td>
                <td><button type="button" className={this.props.partner.active ? `btn btn-default btn-action ${available}` : `btn btn-default btn-action ${notAvailable}`} onClick={this.setActive}></button></td>
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

        return  <table className="table table-wrapper">
                <thead>
                  <tr>
                    <th>Логин</th>
                    <th>Электронная почта</th>
                    <th>ФИО</th>
                    <th>Активность</th>
                  </tr>
                </thead>
                <tbody>
                 { this.state.partners.map(function(item, index) {
                     return <PartnerItem key={index} partner={item}/>
                 })}
                </tbody>
              </table>

    }


}


export default Partners;