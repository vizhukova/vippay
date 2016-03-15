import React from 'react';
import SettingsAction from'./../../actions/SettingsAction'
import SettingsStore from'./../../stores/SettingsStore';
import AlertActions from './../../../../../common/js/Alert/AlertActions';
import NumberInput from './../../../../../common/js/NumberInput';
import _ from 'lodash';


class RateItem extends React.Component {

    constructor () {
        super();
        this.state = {};
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        var state = {
            id: this.props.rate.id,
            result: e.target.value
        }
        this.props.onChange({
            target: {
                name: 'rate',
                value: state
            }
        });
    }

    render() {
        return <NumberInput name="rate"
                         onClick={this.props.onClick}
                         onChange={this.onChange}
                         value={parseFloat(this.props.rate.result).toFixed(2)}
                         toFixed={2}
                    />

    }
}


class Rate extends React.Component {

    constructor(){
        super();
        this.state = SettingsStore.getState();

        this.update = this.update.bind(this);
        this.onChange = this.onChange.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.checkFields = this.checkFields.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        SettingsAction.get();
        SettingsAction.getRate();
        SettingsStore.listen(this.update)
    }

    componentWillUnmount() {
        SettingsStore.unlisten(this.update)
    }

    update(state) {
        this.setState(state);
    }

    onChange(e) {
        if(e.target.name === "basicCurrency") {
            SettingsAction.setBasicCurrency(e.target.dataset.currency).then(() => {
                AlertActions.set({
                    type: 'success',
                    title: 'Успех',
                    text: 'Базовый курс успешно сохранен'
                }, true);
            })
        }
        else if(e.target.name === "rate") {
            var index = _.findIndex(this.state.rate, {id: e.target.value.id});
            this.state.rate[index].result = e.target.value.result;
            this.setState({});
        }

    }

    checkFields() {
        var result = this.state.rate.filter((item) => isNaN(parseInt(item.result)))
        return result.length == 0;
    }

    save() {
        if(! this.checkFields() ) {
            AlertActions.set({
                type: 'error',
                title: 'Ошибка',
                text: 'Неверный формат ввода данных'
            }, true);
            return;
        }

        SettingsAction.addRate(this.state.rate).then((result) => {
            AlertActions.set({
                type: 'success',
                title: 'Успех',
                text: 'Новый курс успешно установлен'
            }, true);
        })
        this.onClick();
    }

    cancel() {
        SettingsAction.getRate();
        this.onClick();
    }

    onClick(e) {
        AlertActions.hide();
    }


    render(){
        var self = this;
        var res = [];
        var counter = 0;

        return  <div>

                        <div className="boxed">
                             <div className="table-head">
                                <span className="title"><b>Базовая валюта</b></span>
                            </div>
                            {self.state.currencies.map((item, index)=> {
                                return <div key={index} className="radio">
                                          <label><input type="radio" name="basicCurrency" data-currency={item.id} onChange={self.onChange} checked={this.state.basicCurrency == item.id}/>{item.name}</label>
                                        </div>
                            })}
                        </div>
                        <div>
                            {this.state.currencies.map((item, index) => {

                                var array = _.filter(self.state.rate, (i) => i.from == item.id);

                                return <div className="row">
                                    <div className="col-md-6 boxed">
                                    <div className="col-md-4 text-right">
                                        <b className="input-label">{`1 ${item.name} = `}</b>
                                    </div>
                                    <div>
                                        {array.map((rate, j) => {
                                            var currency = _.findWhere(self.state.currencies, {id: rate.to})
                                            return <div className="col-md-8 pull-right">
                                                    <div className="col-md-9">
                                                        <RateItem key={counter++}
                                                             rate={rate}
                                                             onChange={self.onChange}
                                                             onClick={self.onClick}/></div>
                                                    <div className="input-label col-md-3">{currency.name}</div>
                                                </div>
                                        })}
                                    </div>
                                </div>
                               </div>
                            })
                            }
                        </div>

                  <button className="btn btn-success pull-left" onClick={this.save} tabIndex={Math.pow(res.length, 2)}>Сохранить</button>
                  <button className="btn btn-danger pull-right" onClick={this.cancel} tabIndex={Math.pow(res.length, 2) + 1}>Отменить</button>

            </div>

    }


}


export default Rate;