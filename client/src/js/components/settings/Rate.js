import React from 'react';
import SettingsAction from'./../../actions/SettingsAction'
import SettingsStore from'./../../stores/SettingsStore';
import AlertActions from './../../../../../common/js/AlertActions';
import _ from 'lodash';


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
            SettingsAction.setBasicCurrency(e.target.dataset.currency);
        }
        else if(e.target.name === "rate") {
            this.state.rate[e.target.dataset.currency].result = e.target.value;
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
            });
            return;
        }
        SettingsAction.addRate(this.state.rate);
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

        this.state.currencies.map((from, index) => {
            var toArr = _.clone(self.state.currencies);
            _.remove(toArr, (el) => el.id === from.id);
            var arr = toArr.map((toEl, i) => {
                var result = this.state.rate[counter] ? this.state.rate[counter].result : '';

                return <tr key={`${index}-${i}`}>
                    <td>{from.name}</td>
                    <td>{toEl.name}</td>
                    <td><input type="text" name="rate" data-currency={`${counter++}`} value={`${result}`} onClick={this.onClick} onChange={self.onChange}/></td>
                </tr>
            });
            res.push(arr);

        })

        return  <div>

                        <div className="table-wrapper boxed">
                             <div className="table-head">
                                <span className="title">Базовая валюта</span>
                            </div>
                            {self.state.currencies.map((item, index)=> {
                                return <div key={index} className="radio">
                                          <label><input type="radio" name="basicCurrency" data-currency={item.id} onChange={self.onChange} checked={this.state.basicCurrency == item.id}/>{item.name}</label>
                                        </div>
                            })}
                        </div>
                        <div className="table-wrapper boxed">
                            <div className="table-head">
                                <span className="title">Курсы валют</span>
                            </div>
                        <table className="table table-bordered text-center-pos">
                            <thead>
                              <tr>
                                <th className="text-center-pos">из</th>
                                <th className="text-center-pos">в</th>
                                <th className="text-center-pos">Результат</th>
                              </tr>
                            </thead>
                            <tbody>
                            {_.flatten(res)}
                            </tbody>
                          </table>
                          </div>

                  <button className="btn btn-success pull-left" onClick={this.save} tabIndex={Math.pow(res.length, 2)}>Сохранить</button>
                  <button className="btn btn-danger pull-right" onClick={this.cancel} tabIndex={Math.pow(res.length, 2) + 1}>Отменить</button>

            </div>

    }


}


export default Rate;