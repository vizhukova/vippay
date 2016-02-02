import React from 'react';
import SettingsAction from'./../../actions/SettingsAction'
import SettingsStore from'./../../stores/SettingsStore';
import _ from 'lodash';


class Rate extends React.Component {

    constructor(){
        super();
        this.state = SettingsStore.getState();

        this.update = this.update.bind(this);
        this.onChange = this.onChange.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        SettingsAction.get();
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
            debugger
            SettingsAction.setBasicCurrency(e.target.dataset.currency);
        }
        else if(e.target.name === "rate") {
            this.state.rate[e.target.dataset.currency] = e.target.value;
        }

    }

    save() {
        console.log(this.state.rate)
        SettingsAction.addRate(this.state.rate);
    }



    render(){
        var self = this;
        var res = [];
        console.log(this.state.basicCurrency)
        this.state.currencies.map((from, index) => {

            var toArr = _.clone(self.state.currencies);
            _.remove(toArr, (el) => el.id === from.id);
            var arr = toArr.map((toEl, i) => {
                return <tr key={`${index}-${i}`}>
                    <td>{from.name}</td>
                    <td>{toEl.name}</td>
                    <td><input type="text" name="rate" data-currency={`${from.id}-${toEl.id}`} onChange={self.onChange}/></td>
                </tr>
            });
            res.push(arr);

        })
        return  <div className="row">
                <div className="text-center">
                    <span><b>Основной курс</b></span>
                    {self.state.currencies.map((item, index)=> {
                        return <div key={index} className="radio">
                                  <label><input type="radio" name="basicCurrency" data-currency={item.id} onChange={self.onChange} checked={this.state.basicCurrency == item.id}/>{item.name}</label>
                                </div>
                    })}
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
                  <div className="btn btn-success pull-right" onClick={this.save}>Сохранить</div>
                  <div className="btn btn-danger pull-left" >Отменить</div>
                </div>

    }


}


export default Rate;