import React from 'react';
import PartnersAction from './../actions/PartnersAction';
import AuthAction from './../actions/AuthActions';
import PartnersStore from './../stores/PartnersStore';
import AuthStore from './../stores/AuthStore';
import List from'./../../../../common/js/List';
import NumberInput from'./../../../../common/js/NumberInput';
import ModalActions from'./../../../../common/js/ModalWindow/ModalActions';
import AlertActions from'./../../../../common/js/Alert/AlertActions';
import _  from 'lodash';


/**
 * Компонент строки в списке партнёров
 */
class PartnerItem extends React.Component {

    constructor() {
        super();
        this.state = {
            partner: {},
            value: '',
            clear: false
        };

        this.paymentSettings = {
            'card': 'Карта',
            'yandex': 'Яндекс.Кошелек'
        };

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.setActive = this.setActive.bind(this);
        this.setPartnerFee = this.setPartnerFee.bind(this);
        this.showPayments = this.showPayments.bind(this);
    }

    componentDidMount() {
        this.setState({partner: this.props.item});
    }

    componentWillReceiveProps() {
        this.state.clear = true;
        this.setState({});
    }

    setActive() {
        var partner = _.cloneDeep(this.props.item);
        partner.active = !partner.active;
        PartnersAction.edit(partner);
    }

    onChange(e) {

        if (e.target.name == 'fee_pay') {
            var fee = {};
            fee[e.target.name] = e.target.value;
            this.state.value = e.target.value;
            _.assign(this.props.item.fee, fee);
        } else {

            var state = {};
            state[e.target.name] = e.target.value;
            _.assign(this.props.item, state);

        }

        this.state.clear = false;

        this.setState({partner: this.props.item});
    }

    onClick() {

        if (!this.state.partner.fee.fee_pay) {
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
                this.state.partner.fee.fee_pay = 0;
                this.state.value = 0;
                this.state.clear = false;
                this.setState({});
            })
        }

    }

    /**
     * Метод для установки комиссии конкретному партнёру
     */
    setPartnerFee() {

        PartnersAction.setPartnerFee(this.state.partner).then((result) => {
            AlertActions.set({
                type: 'success',
                title: 'Успех',
                text: 'Установка комиссии прошла успешно'
            }, true);

        })

    }

    showPayments() {

        var array = [];

        this.state.partner.payment.map((payment) => {
            array.push(this.paymentSettings[payment.name] + ' : ' + payment.value);
        });

        ModalActions.set({
            data: {
                title: `Платежные данные ${this.state.partner.login}`,
                array: array

            },
            name: 'ArrayOfMessages'
        })

    }

    render() {
        var available = "glyphicon glyphicon-ok-circle btn btn-default btn-action";
        var notAvailable = "glyphicon glyphicon-ban-circle btn btn-danger btn-action";

        var fee = this.props.item.fee || {};
        var fee_added = fee.fee_added || 0;
        var fee_payed = fee.fee_payed || 0;
        var partner_fee = this.props.item.partner_fee || '';

        return <tr>
            <td>{this.props.item.login}</td>
            <td>{this.props.item.email}</td>
            <td>{this.props.item.name}</td>
            <td>
                <button type="button"
                        className={this.props.item.active ? available : notAvailable}
                        onClick={this.setActive}/>
            </td>
            <td>
                <button type="button" className="btn btn-default btn-action glyphicon glyphicon-eye-open" onClick={this.showPayments} />
            </td>
            <td className="col-md-2">
                <div className="input-group input-group-inline">
                    <NumberInput onChange={this.onChange}
                                 name="fee_pay"
                                 value={this.state.value}
                                 toFixed={2}
                                 clear={this.state.clear}/>
                                <span className="input-group-btn">
                                    <button className="btn btn-default glyphicon glyphicon-sort" type="button"
                                            onClick={this.onClick}/>
                                </span>
                </div>

            </td>
            <td>{ parseFloat(fee_added).toFixed(2) }</td>
            <td>{ parseFloat(fee_payed).toFixed(2) }</td>
            <td className="col-md-2">
                <div className="input-group input-group-inline">
                    <NumberInput onChange={this.onChange}
                                 name="partner_fee"

                                 toFixed={2}
                                 value={partner_fee}
                                 clear={this.state.clear}/>
                                <span className="input-group-btn">
                                    <div className="btn btn-default btn-action " type="button"
                                         onClick={this.setPartnerFee}>Установить
                                    </div>
                                </span>
                </div>

            </td>
        </tr>
    }


}


/**
 * Компонент списка партнёров
 */
class Partners extends React.Component {

    constructor() {
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


    render() {
        var self = this;
        //console.log(this.state.partners)
        return <div>
            <div className="boxed">
                <h4>Партнер, которому будут перечисляться бонусы</h4>
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
                        {name: 'Платежные данные', key: ''},
                        {name: 'Выплатить', key: ''},
                        {name: 'Должен', key: 'fee.fee_added'},
                        {name: 'Выплачено', key: 'fee.fee_payed'},
                        {name: 'Комиссия', key: ''}
                    ]}
            />
        </div>

    }


}


export default Partners;
