import React from 'react';
import SettingsAction from'./../actions/SettingsActions'
import SettingsStore from'./../stores/SettingsStore';
import PasswordInput from'./../../../../common/js/PasswordInput';
import Alert from './../../../../common/js/Alert/Alert';
import AlertActions from './../../../../common/js/Alert/AlertActions';
import _ from 'lodash';

/**
 * Элемент формы платёжной системы
 */
class PaymentItem extends React.Component {

    constructor() {
        super();
        this.paymentSettings = {
          'card': 'Карта',
          'yandex': 'Яндекс кошелек'
        };
        this.state = {
            payment: {}
        };
        this.onChange = this.onChange.bind(this);
        //this.onClick = this.onClick.bind(this);
        this.save = this.save.bind(this);
        this.hideError = this.hideError.bind(this);
    }


    componentDidMount() {
        this.state.payment = this.props ? this.props.payment : {};
        this.setState({});
    }

    componentWillReceiveProps(props) {
        this.state.payment = props ? props.payment : {};
        this.setState({});
    }

    onChange(e) {

        this.state.payment.value = e.target.value;
        this.props.onChange({id: this.props.id, payment: this.props.payment})
    }

    hideError() {
        AlertActions.hide();
    }


    save() {
        this.props.save(this.props.id);
    }

    render() {
        return <div>
            <div className="block boxed">
                <div className="block-title">
                    <h3>
                        { this.paymentSettings[this.state.payment.name] }
                    </h3>
                </div>
                <div className="row block-inner">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="field-text" type="text"
                                value={this.state.payment.value}
                                placeholder={this.paymentSettings[this.state.payment.name]}
                                name={this.state.payment.name} onChange={this.onChange}
                                onClick={this.hideError}/>
                        </div>

                    </div>
                </div>
                <div className="row-footer row">
                    <div className="col-sm-6 pull-right">
                        <button className="btn pull-right" onClick={this.save}>Сохранить</button>
                    </div>
                </div>
            </div>
        </div>
    }

}

/**
 * Форма платёжной системы
 */
class Payment extends React.Component {

    constructor() {
        super();
        this.state = SettingsStore.getState();

        this.update = this.update.bind(this);
        this.onChange = this.onChange.bind(this);
        //this.onClick = this.onClick.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        SettingsStore.listen(this.update);

    }

    componentWillUnmount() {
        SettingsStore.unlisten(this.update)
    }

    update(state) {
        this.setState(state);
    }
    //
    onChange(data) {
        this.state.partner.payment[data.id] = data.payment;
        this.setState({});
    }
    //
    //onClick(e) {
    //    this.setState({
    //        isMoreInformation: !this.state.isMoreInformation
    //    });
    //}
    //
    save(id) {
        this.state.savedId = id;
        SettingsAction.editPayment(this.state.partner).then((res) => {
            AlertActions.set({
                type: 'success',
                title: 'Успех',
                text: 'Настройки платежной системы успешно сохранены'
            }, true);
        })
    }


    render() {
        console.log(this.state.partner.payment)
        var payment = this.state.partner.payment || [];
        return <div>
            {payment.map((item, index) => {
                return <PaymentItem payment={item} key={index} id={index}
                                    onChange={this.onChange}
                                    save={this.save}/>
            })}
        </div>


    }


}


export default Payment;
