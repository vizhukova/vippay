import React from 'react';
import SettingsAction from'./../../actions/SettingsAction'
import SettingsStore from'./../../stores/SettingsStore';
import PasswordInput from'./../../../../../common/js/PasswordInput';
import Alert from './../../../../../common/js/Alert/Alert';
import AlertActions from './../../../../../common/js/Alert/AlertActions';
import paymentSettings from './../../../../../common/paymentSettings';
import _ from 'lodash';

/**
 * Элемент формы платёжной системы
 */
class PaymentItem extends React.Component {

    constructor() {
        super();
        this.state = {
            isMoreInformation: false,
            payment: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.save = this.save.bind(this);
        this.hideError = this.hideError.bind(this);
    }


    componentDidMount() {
        this.state.payment = this.props.payment;
        this.setState({});
    }

    onChange(e) {
        if (e.target.name == 'active') {
            this.state.payment.active = !this.state.payment.active;
        }

        else if(e.target.name == 'details') {
            this.props.payment[`details`] = e.target.value;
        }

        else {
            this.state.payment.fields[e.target.name] = e.target.value;
        }
        this.setState({});

        this.props.onChange({id: this.props.id, payment: this.state.payment});
    }

    hideError() {
        AlertActions.hide();
    }

    onClick(e) {
        this.setState({
            isMoreInformation: !this.state.isMoreInformation
        });
        this.hideError();
    }

    save() {
        this.props.save(this.props.id);
    }

    render() {
        return <div>
            <div className="block boxed">
                <div className="block-title">
                    <h3>
                        { paymentSettings[this.props.payment.name] }
                    </h3>
                </div>
                <div className="row block-inner">
                    <div className="col-sm-6">
                        {Object.keys(this.props.payment.fields).map((item, index) => {

                            return <div className="form-group" key={index}>
                                <input
                                    className="field-text" type="text"
                                    value={this.props.payment.fields[item]}
                                    placeholder={paymentSettings[item]}
                                    name={item} onChange={this.onChange}
                                    onClick={this.hideError}/>
                            </div>

                        })}
                        <div className="checkbox">
                            <label className="text-warning">
                                <input name="active"
                                       checked={this.props.payment.active} type="checkbox"
                                       onChange={this.onChange}
                                       onClick={this.hideError}/>
                                Активность</label>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <label>Детали:</label>
                            <textarea rows="6" name={`details`} onChange={this.onChange}>
                                { this.props.payment.details || paymentSettings[`${this.props.payment.name}_details`] }
                            </textarea>
                    </div>
                </div>
                <div className="row-footer row">
                    <div className={` more ${this.state.isMoreInformation ? '' : 'hide'}`}>
                        <pre>{ paymentSettings[`${this.props.payment.name}_more_info`] }</pre>
                    </div>
                    <div className="col-sm-6 left">
                        <button className="btn" onClick={this.onClick}>Подробнее..</button>
                    </div>
                    <div className="col-sm-6 right">
                        <button className="btn" onClick={this.save}>Сохранить</button>
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
        this.onClick = this.onClick.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        SettingsStore.listen(this.update);
        SettingsAction.getPayment();

    }

    componentWillUnmount() {
        SettingsStore.unlisten(this.update)
    }

    update(state) {
        this.setState(state);
    }

    onChange(data) {
        this.state.payment[data.id] = data.payment;
        this.setState({});
    }

    onClick(e) {
        this.setState({
            isMoreInformation: !this.state.isMoreInformation
        });
    }

    save(id) {
        this.state.savedId = id;
        SettingsAction.editPayment(this.state.payment).then((res) => {
            AlertActions.set({
                type: 'success',
                title: 'Успех',
                text: 'Настройки платежной системы успешно сохранены'
            }, true);
        })
    }


    render() {
        return <div>
            {this.state.payment.map((item, index) => {
                return <PaymentItem payment={item} key={index} id={index}
                                    onChange={this.onChange}
                                    save={this.save}/>
            })}
        </div>


    }


}


export default Payment;
