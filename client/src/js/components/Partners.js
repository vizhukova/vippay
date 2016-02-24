import React from 'react';
import PartnersAction from './../actions/PartnersAction';
import AuthAction from './../actions/AuthActions';
import PartnersStore from './../stores/PartnersStore';
import List from'./../../../../common/js/List';
import NumberInput from'./../../../../common/js/NumberInput';
import AlertActions from'./../../../../common/js/Alert/AlertActions';
import _  from 'lodash';


class PartnerItem extends React.Component {

    constructor(){
        super();
        this.state = {
            partner: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.setActive = this.setActive.bind(this);
    }

    componentDidMount() {
        this.setState({partner: this.props.item});
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

    onChange(e) {
        var fee = {};
        fee[e.target.name] = e.target.value;
        _.assign(this.props.item.fee, fee);
        this.setState({partner: this.props.item});
    }

    onClick() {
        PartnersAction.setFee(this.state.partner).then((result) => {
            AlertActions.set({
                type: 'success',
                title: 'Успех',
                text: 'Выплата прошла успешно'
            })
        })
    }

    render(){
        var available = "glyphicon glyphicon-ok-circle btn btn-default btn-action";
        var notAvailable = "glyphicon glyphicon-ban-circle btn btn-danger btn-action";

        var fee = this.props.item.fee || {};
        var fee_added = fee.fee_added || 0;
        var fee_payed = fee.fee_payed || 0;
        console.log(fee.fee_added);

        return <tr>
                <td>{this.props.item.login}</td>
                <td>{this.props.item.email}</td>
                <td>{this.props.item.name}</td>
            <td>
                <button type="button"
                        className={this.props.item.active ? available : notAvailable}
                        onClick={this.setActive}/>
            </td>
            <td className="col-md-2">
                <div className="input-group input-group-inline">
                    <NumberInput onChange={this.onChange} name="fee_pay"/>
                                <span className="input-group-btn">
                                    <button className="btn btn-default glyphicon glyphicon-sort" type="button"
                                            onClick={this.onClick}/>
                                </span>
                </div>

            </td>
            <td>{ parseFloat(fee_added).toFixed(2) }</td>
            <td>{ parseFloat(fee_payed).toFixed(2) }</td>
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
        PartnersAction.getFee();
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
        console.log(this.state.partners)
        return  <List
            title="Партнеры"
            error={this.state.error}
            items={this.state.partners}
            sort={this.sort}
            itemComponent={PartnerItem}
            isPaginate={true}
            thead={[
                {name: 'Логин', key: 'login'},
                {name: 'Электронная почта', key: 'email'},
                {name: 'ФИО', key: 'name'},
                {name: 'Активность', key: 'active'},
                {name: 'Выплатить', key: ''},
                {name: 'Должен', key: 'fee.fee_added'},
                {name: 'Выплачено', key: 'fee.fee_payed'}
            ]}
        />

    }


}


export default Partners;
