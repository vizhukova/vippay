import React from 'react';
import SettingsAction from'./../../actions/SettingsAction'
import SettingsStore from'./../../stores/SettingsStore';
import AlertActions from'./../../../../../common/js/Alert/AlertActions';
import Select from'./../../../../../common/js/Select';
import Yandex from'./../../../../../orders/src/js/components/Yandex';
import _ from 'lodash';
import moment from 'moment';


class PricingItem extends React.Component {

    constructor() {
        super();
        this.state = {};

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onChoose = this.onChoose.bind(this);
    }

    onChange(e) {
        var obj = _.findWhere(this.props.values, {price: e.target.value});
        obj.key = this.props.item;
        this.props.onChange(obj);
    }

    onClick(e) {
        e.stopPropagation();
        if(! this.props.isVisible) return;
        this.props.currentTariff[this.props.item].name = this.props.item;
        SettingsAction.setTariff( this.props.currentTariff[this.props.item])
            .then((res) => {
                SettingsAction.setIsActive(true);
            })
    }
    
    onChoose(e) {
        this.props.onChoose(this.props.item);
    }
    

    render() {

        var tariff_date = this.props.tariff_payed.tariff_date;
        var day_end = moment(tariff_date).add(this.props.tariff_payed.tariff_duration, 'month');
        var days = day_end.diff(moment(), 'days');
        days = days < 0 ? 0 : days;
        var user_id = this.props.tariff_payed.id;
        var isShowTar = this.props.tariff_payed.tariff_name == this.props.item && this.props.tariff_payed.tariff_payed;
        var durationCurrentTariff = isShowTar
            ? _.findWhere(this.props.tariffs[this.props.item].prices, {time: +this.props.tariff_payed.tariff_duration}).price
            : null;

        console.log('this.props.tariff_payed', this.props.tariff_payed);
        return <li className={`price_col price_col_blue  first ${this.props.isVisible ? 'chosen' : ''}`} onClick={this.onChoose}>
                            <div className="price_item">
                                <div className="price_col_head">
                                    <div className="price">{isShowTar ? `Осталось ${days} дней` : `${this.props.currentTariff[this.props.item].price} руб`}</div>
                                </div>
                                <div className="price_col_body clearfix">
                                    <div className="price_body_inner">
                                        <div className="price_body_top">

                                            <span>тариф</span>
                                            <strong>{this.props.tariffs[this.props.item].name}</strong>
                                            <span>{`${(this.props.currentTariff[this.props.item].price/this.props.currentTariff[this.props.item].time).toFixed(2)} руб / мес`}</span><br />
                                            <span></span>

                                            <div className="line"></div>
                                        </div>
                                        <div className="form-inline">
                                            <div className="form-group">

                                                  <div className="input-group-addon">Срок: </div>

                                                  <Select values={this.props.values}
                                                        current_value={durationCurrentTariff}
                                                        fields={{
                                                        name: 'time',
                                                        value: 'price'
                                                        }}
                                                        onChange={this.onChange}
                                                  />

                                                  <div className="input-group-addon">месяцев</div>

                                            </div>
                                        </div>

                                        <ul className="description">
                                            {this.props.tariffs[this.props.item].description.map((item) => {
                                                return <li>{item}</li>
                                            })}
                                             {this.props.tariffs[this.props.item].off_description.map((item) => {
                                                return <li className="line-through">{item}</li>
                                            })}
                                             {this.props.tariffs[this.props.item].limitation.map((item) => {
                                                return <li className="text-danger">{item}</li>
                                            })}
                                        </ul>

                                    </div>
                                </div>
                                <div className="price_col_foot">
                                    <a className={`${this.props.isVisible ? 'visible' : ''}`} >
                                        <div onClick={this.onClick} className="price-btn">
                                        <Yandex method={ {
                                            action: 'https://money.yandex.ru/quickpay/confirm.xml',
                                            receiver: '410012638338487',
                                            formcomment: `${this.props.tariffs[this.props.item].name} ${this.props.currentTariff[this.props.item].time}`,
                                            'short-dest': `${this.props.tariffs[this.props.item].name} ${this.props.currentTariff[this.props.item].time}`,
                                             label: `${this.props.item}::${this.props.currentTariff[this.props.item].time}::${user_id}`,
                                             targets: `${this.props.tariffs[this.props.item].name} ${this.props.currentTariff[this.props.item].time}`,
                                             sum: this.props.currentTariff[this.props.item].price,
                                             'need-fio': true,
                                             'need-email': true
                                        } }
                                        />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </li>
    }
}

class Pricing extends React.Component{

    constructor(){
        super();
        this.state={
            current: [],
            currentTariff: {},
            chosenTariff: null
        };
        _.assign(this.state, SettingsStore.getState());

        this.tariff = {
          'start': {
              name: 'Старт',
              prices: [
                  {time: 12, price: '2500'}
              ],
              description: [
                  'Прием заказов',
                  'Возможность подключения к основным платежным системам',
                  'Управление заказами',
                  'Управление клиентами',
                  'Создание уникальных ссылок на цифровой товар для каждого клиента',
                  'Многоуровневая партнерская программа',
                  'Учет эффективности рекламных кампаний у партнеров',
                  'Организация промо-акций',
                  'Апселлы',
                  'Напоминание клиентам о получении и оплате заказа',
                  'Совладельцы, соавторы',
                  'Финансы'
              ],
              off_description: [],
              limitation:['ограничение по сумме заказов 150 000 руб.']

          },
          'business': {
            name: 'Бизнес',
              prices: [
                  {time: 3, price: '3000'},
                  {time: 6, price: '5250'},
                  {time: 12, price: '9000'}
              ],
              description: [
                'Прием заказов',
                'Возможность подключения к основным платежным системам',
                'Управление заказами',
                'Управление клиентами',
                'Создание уникальных ссылок на цифровой товар для каждого клиента',
                'Многоуровневая партнерская программа',
                'Учет эффективности рекламных кампаний у партнеров'
              ],
              off_description: [
                  'Организация промо-акций',
                  'Апселлы',
                  'Напоминание клиентам о получении и оплате заказа',
                  'Совладельцы, соавторы',
                  'Финансы'
              ],
              limitation: ['сумма заказов не ограниченна']
          },
          'magnate': {
            name: 'Магнат',
              prices: [
                  {time: 3, price: '6000'},
                  {time: 6, price: '9000'},
                  {time: 12, price: '18000'}
              ],
              description: [
                'Прием заказов',
                'Возможность подключения к основным платежным системам',
                'Управление заказами',
                'Управление клиентами',
                'Создание уникальных ссылок на цифровой товар для каждого клиента',
                'Многоуровневая партнерская программа',
                'Учет эффективности рекламных кампаний у партнеров',
                'Организация промо-акций',
                'Апселлы',
                'Напоминание клиентам о получении и оплате заказа',
                'Совладельцы, соавторы',
                'Финансы'
              ],
              off_description: [],
              limitation: ['сумма заказов не ограниченна']
          }
        };
        this.onChange = this.onChange.bind(this);
        this.onChoose = this.onChoose.bind(this);
        this.setCurrentTariff = this.setCurrentTariff.bind(this);
        this.update = this.update.bind(this);

        this.setCurrentTariff(this.tariff);
    }

    componentDidMount() {
        SettingsStore.listen(this.update)
    }

    update(state) {
        this.setState(state);
    }

    onChange(e) {
        this.state.currentTariff[e.key] = e;
        this.setState({});
    }

    onChoose(tariff) {
        var newTariff = this.state.chosenTariff == tariff ? null : tariff;

        this.setState({
            chosenTariff: newTariff
        })
    }

    setCurrentTariff(state) {
        var obj = {};

         Object.keys(this.tariff).map((key) => {
                obj[key] = {
                    key: key,
                    price: state[key].prices[0].price,
                    time: state[key].prices[0].time
                };
            });

            this.state.currentTariff = obj;
    }

    render(){
        var self = this;
        console.log('this.props', this.props)
        return <div className="col-sm-12 clearfix pricing-box">
                <ul className="clearfix price-list">
                    {Object.keys(this.tariff).map((key, index) => {
                        var values = self.tariff[key].prices;
                        return <PricingItem values={values}
                                            item={key}
                                            key={index}
                                            currentTariff={self.state.currentTariff}
                                            tariffs={self.tariff}
                                            onChange={this.onChange}
                                            onChoose={this.onChoose}
                                            isVisible={this.state.chosenTariff == key}
                                            tariff_payed={this.state.tariff}
                        />
                    })}
                </ul>
            </div>

    }

}


export default Pricing;