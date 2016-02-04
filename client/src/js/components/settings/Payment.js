import React from 'react';
import SettingsAction from'./../../actions/SettingsAction'
import SettingsStore from'./../../stores/SettingsStore';
import PasswordInput from'./../../../../../common/js/PasswordInput';
import Alert from './../../../../../common/js/Alert';
import _ from 'lodash';


class PaymentItem extends React.Component {

     constructor(){
        super();
        this.state = {
            isMoreInformation: false,
            payment: {
                dataFields: {}
            },
            error: {}
        }
        this.update = this.update.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.save = this.save.bind(this);
        this.hideError = this.hideError.bind(this);
    }


    update(state) {
        //this.setState(state);
    }

    componentDidMount() {
        this.state.payment = this.props.payment;
        this.state.payment.dataFields = this.state.payment.dataFields ? this.state.payment.dataFields : {};
        this.setState({});
    }

    onChange(e) {
        if(_.indexOf( this.state.payment.fields, e.target.name) > -1) {
            _.assign(this.state.payment.dataFields, {[e.target.name]: e.target.value});

        }

        else if(e.target.name == 'active') {
            this.state.payment.active = !this.state.payment.active;
        }

        else {
            this.state.payment[e.target.name] = e.target.value;
        }
        this.setState({});

        this.props.onChange({id: this.props.id, payment: this.state.payment});
    }

    hideError() {
        this.setState({
            error: {}
        })
    }

    onClick(e) {
      this.setState({
          isMoreInformation: !this.state.isMoreInformation
      });
      this.hideError();
    }

    save() {
        console.log(this.state.payment)
        if(this.state.payment.dataFields.password !== this.state.payment.dataFields.confirmPassword) {

            this.setState({error: {
                    type: 'error',
                    title: 'Ошибка',
                    text: 'Проверьте правильность заполнения данных'
                }})

        } else {

            this.props.save(this.props.id);

        }
    }


    render() {
        return <div className="boxed">
                <Alert type={this.state.error.type} text={this.state.error.text} title={this.state.error.title} />
                      <div className="table-wrapper col-sm-12">
                           <div className="table-head">
                            <span className="title">
                                {this.props.payment.name}
                            </span>
                           </div>
                          <div className="row">
                              <div className="col-sm-6">
                                  {this.props.payment.fields.map((item, index) => {
                                      return <input
                                                className="form-control input-lg" type="text"
                                                value={this.state.payment.dataFields[item]}
                                                key={index} placeholder={item}
                                                name={item} onChange={this.onChange}
                                                onClick={this.hideError}/>
                                  })}
                                  <div className="checkbox">
                                      <label className="text-warning">
                                          <input name="active"
                                                 checked={this.state.payment.active} type="checkbox"
                                                 onChange={this.onChange}
                                                 onClick={this.hideError}/>
                                          Активность</label>
                                    </div>
                              </div>
                              <div className="col-sm-6">
                                  <span>Детали: </span><br/>
                                   <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</span>
                              </div>
                           <button className="btn btn-default btn-submit pull-left" onClick={this.onClick}>Подробнее..</button>
                          <button className="btn btn-default btn-submit pull-right" onClick={this.save}>Сохранить</button>

                          </div>
                          </div>

                      <div className={`table-wrapper col-sm-12 ${this.state.isMoreInformation ? '' : 'hide'}`}>
                          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</span>
                      </div>
                    </div>
    }
}


class Payment extends React.Component {

    constructor(){
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
        SettingsAction.editPayment(this.state.payment);
    }


    render(){
        var self = this;
        return  <div>
            {this.state.payment.map((item, index) => {
                return <PaymentItem payment={item} key={index} id={index}
                                    onChange={this.onChange}
                                    save={this.save}/>
            })}
            </div>


    }


}


export default Payment;