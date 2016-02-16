import React from 'react';
import SettingsAction from'./../../actions/SettingsAction'
import SettingsStore from'./../../stores/SettingsStore';
import AlertActions from'./../../../../../common/js/AlertActions';
import Select from'./../../../../../common/js/Select';
import _ from 'lodash';


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
        e.preventDefault();
        this.props.currentTariff[this.props.item].name = this.props.item;
        SettingsAction.setTariff( this.props.currentTariff[this.props.item]);
    }
    
    onChoose() {
        this.props.onChoose(this.props.item);
    }
    

    render() {
        console.log(this.props.isVisible)
        return <li className={`price_col price_col_blue  first ${this.props.isVisible ? 'chosen' : ''}`} onClick={this.onChoose}>
                            <div className="price_item">
                                <div className="price_col_head">
                                    <div className="price">{this.props.currentTariff[this.props.item].price} руб</div>
                                </div>
                                <div className="price_col_body clearfix">
                                    <div className="price_body_inner">
                                        <div className="price_body_top">
                                            <span>тариф</span>
                                            <strong>{this.props.tariffs[this.props.item].name}</strong>
                                            <span>{`${(this.props.currentTariff[this.props.item].price/this.props.currentTariff[this.props.item].time).toFixed(2)} руб / мес`}</span>
                                            <div className="line"></div>
                                        </div>
                                        <div className="form-inline">
                                            <div className="form-group">
                                                  <div class="input-group-addon">Срок: </div>
                                                  <Select values={this.props.values}
                                                        current_value={this.props.currentTariff[this.props.item].price}
                                                        fields={{
                                                        name: 'time',
                                                        value: 'price'
                                                        }}
                                                        onChange={this.onChange}
                                                  />
                                                  <div class="input-group-addon">месяцев</div>
                                            </div>
                                        </div>
                                        <ul className="description">
                                            {this.props.tariffs[this.props.item].description.map((item) => {
                                                return <li>{item}</li>
                                            })}
                                             {this.props.tariffs[this.props.item].off_description.map((item) => {
                                                return <li className="line-through">{item}</li>
                                            })}
                                        </ul>

                                    </div>
                                </div>
                                <div className="price_col_foot">
                                    <a href="#" className={`btn btn-blue ${this.props.isVisible ? 'visible' : ''}`} onClick={this.onClick}>
                                        <span>Buy Now</span>
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
              off_description: []

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
              ]
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
              off_description: []
          }
        };
        this.onChange = this.onChange.bind(this);
        this.onChoose = this.onChoose.bind(this);
        this.setCurrentTariff = this.setCurrentTariff.bind(this);

        this.setCurrentTariff(this.tariff);
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
                    {Object.keys(this.tariff).map((key) => {
                        var values = self.tariff[key].prices;
                        return <PricingItem values={values}
                                            item={key}
                                            currentTariff={self.state.currentTariff}
                                            tariffs={self.tariff}
                                            onChange={this.onChange}
                                            onChoose={this.onChoose}
                                            isVisible={this.state.chosenTariff == key}
                        />
                    })}
                </ul>
            </div>

    }

}


export default Pricing;