import React from 'react';
import PartnersAction from './../actions/PartnersAction';
import AuthAction from './../actions/AuthActions';
import PartnersStore from './../stores/PartnersStore';
import AuthStore from './../stores/AuthStore';
import List from'./../../../../common/js/List';
import NumberInput from'./../../../../common/js/NumberInput';
import AlertActions from'./../../../../common/js/Alert/AlertActions';
import _  from 'lodash';


class PartnerItem extends React.Component {

    constructor(){
        super();
        this.state = {
            partner: {},
            value: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.setActive = this.setActive.bind(this);
    }

    componentDidMount() {
        this.setState({partner: this.props.item});
    }

    componentWillReceiveProps() {
        this.state.value =  '';
        this.setState({});
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
        debugger
        var fee = {};
        fee[e.target.name] = e.target.value;
        this.state.value = e.target.value;
        _.assign(this.props.item.fee, fee);
        this.setState({partner: this.props.item});
    }

    onClick() {
        debugger
        if(!this.state.partner.fee.fee_pay) {
            AlertActions.set({
                title: "Ошибка",
                text: "Введите правильное значение для перевода",
                type: 'error'
            }, true);
        } else {
            PartnersAction.setFee(this.state.partner).then((result) => {
                AlertActions.set({
                    type: 'success',
                    title: 'Успех',
                    text: 'Выплата прошла успешно'
                }, true);

                this.state.partner.fee.fee_pay = null;
                this.setState({});
            })
        }

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
                    <NumberInput onChange={this.onChange} name="fee_pay" value={this.state.value} toFixed={2}/>
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
        this.state = _.assign(PartnersStore.getState(), AuthStore.getState());

        this.update = this.update.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.setState({sort: ''});
        PartnersAction.getAll();
        PartnersAction.getFee();
        PartnersAction.getPartnerQuery();
        PartnersStore.listen(this.update);
        AuthStore.listen(this.update);
    }

    componentWillUnmount() {
        PartnersStore.unlisten(this.update);
        AuthStore.unlisten(this.update);
    }

    update(state) {
        this.setState(state);
    }

    onChange(e) {
        PartnersAction.editFeeQuery({partner_fee: e.target.value}).then((res) => {
            AlertActions.set({
                type: 'success',
                title: 'Успех',
                text: 'Данные успешно сохранены'
            }, true);
        })
    }


    render(){
        var self = this;
        console.log('USERRRt',this.state.partner_query)
        return  <div>
                <div className="boxed">
                    <h4>Партнер, которому будут перчисляться бонусы</h4>
                    <div>
                     <label>
                        <input type="radio" value="first"
                               checked={this.state.partner_query == 'first'}
                               onChange={this.onChange}/>
                        Первый
                      </label>
                     </div>
                    <div>
                      <label>
                        <input type="radio" value="last"
                               checked={this.state.partner_query == 'last'}
                               onChange={this.onChange}/>
                        Последний
                      </label>
                    </div>
                </div>

                <List
                    title="Партнеры"
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
            </div>

    }


}


export default Partners;
