import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import PromoStore from'./../../stores/PromoStore';
import PromoAction from'./../../actions/PromoAction';
import ProductsAction from'./../../actions/ProductsAction';
import AlertActions from './../../../../../common/js/Alert/AlertActions';
import NumberInput from'./../../../../../common/js/NumberInput';
import DateInput from './../../../../../common/js/DateInput';
import _  from 'lodash';
import moment  from 'moment';

/**
 * Элемент товара в промоакции
 */
class ProductItem extends React.Component {

    constructor() {
        super();
        this.state = {};

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.props.onChange(
            {
                target: {
                    name: 'product',
                    value: this.props.item.id,
                    checked: e.target.checked
                }
            }
        );
    }

    render() {
        //console.log(this.props.checked)
        return  <label>
                    <input type="checkbox" name="product" checked={this.props.checked != -1} onChange={this.onChange}/>
                    {this.props.item.name}
                 </label>
    }
}

/**
 * Форма создания промоакции
 */
class PromoForm extends React.Component {

    constructor(){
        super();
        this.state = PromoStore.getState();
        this.update = this.update.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onTimeChange = this.onTimeChange.bind(this);
        this.checkFields = this.checkFields.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.add = this.add.bind(this);
        this.edit = this.edit.bind(this);
        this.beforeSend = this.beforeSend.bind(this);
    }

    componentDidMount() {
        if(this.props.params.id) {
            PromoAction.getById(this.props.params.id);
        }

        ProductsAction.get();
        PromoStore.listen(this.update);

    }

    componentWillReceiveProps(nextProps){
         if(this.props.params.id) {
            PromoAction.getById(this.props.params.id);
        }
    }

    componentWillUnmount() {
        PromoAction.clear();
        PromoStore.unlisten(this.update);
    }

    beforeSend() {
         if(! this.checkFields()) {
            AlertActions.set({
                type: 'error',
                title: 'Ошибка',
                text: 'Проверьте правильность введения данных'
            });
            return;
        }

        var promo = _.clone(this.state.promo);

        if(! this.props.params.id) {
            promo.date = this.state.promo.type == 'during'
            ? moment().add(promo.date.days || 0, 'day')
                     .add(promo.date.hours || 0, 'hour')
                     .add(promo.date.minutes || 0, 'minute')
                     .add(promo.date.seconds || 0, 'second')
            : moment(`${promo.date.year}-${promo.date.month}-${promo.date.day}`);
        }

        return promo;
    }

    add() {
        var promo = this.beforeSend();
        if (promo) PromoAction.add(promo).then((res) => {
            history.back();
        })
    }

    edit() {
        var promo = this.beforeSend();
        if (promo) PromoAction.edit(this.state.promo).then((res) => {
            history.back();
        })
    }

    onChange(e) {

        if(e.target.name == 'product') {
            if(e.target.checked) this.state.promo.products.push(e.target.value);
            else {
                this.state.promo.products = _.filter(this.state.promo.products, (id) => id != e.target.value);
                this.state.checkAll = false;
            }
        }

        else if(e.target.name == 'checkAll') {
            if(! e.target.checked) this.state.promo.products = [];
            else this.state.promo.products = this.state.products.map((p) => p.id);
            this.state.checkAll = e.target.checked;
        }

        else if(e.target.name == 'until' || e.target.name == 'during') {
            this.state.promo.type = e.target.name;
            this.state.promo.date = {};
        }

        else {
            var state = {};
            state[e.target.name] =  e.target.value;
            _.assign(this.state.promo, state);
        }

        this.state.checkAll = this.state.products.length == this.state.promo.products.length;

        this.setState({});
    }

    checkFields() {
        var p = this.state.promo;
        var timeDiff = true;

        if(! this.props.params.id && p.date) {
            var now = moment();
            var date = this.state.promo.type == 'during'

                ? moment().add(p.date.days || 0, 'day')
                         .add(p.date.hours || 0, 'hour')
                         .add(p.date.minutes || 0, 'minute')
                         .add(p.date.seconds || 0, 'second')

                : moment(`${p.date.year}-${p.date.month}-${p.date.day}`);


            timeDiff = date.diff(now) > 0;
        }

        return timeDiff && ! isNaN(p.discount) && _.trim(p.code).length && p.products.length && p.date;
    }

    onTimeChange(e) {
        this.state.promo.date[e.target.name] = e.target.value;
        this.setState({});
    }


    onClick(e) {
        AlertActions.hide();
    }

    onKeyDown(e) {
		if(e.keyCode == 13) {
            this.props.params.id  ? this.edit() : this.add();
            e.preventDefault();
        }
	}

    update(state){
        state.checkAll = state.products.length == state.promo.products.length;
        this.setState(state);
    }

    render(){

        var self = this;
        //console.log('checkAll', this.state.checkAll)

        return  <div className="col-sm-7 form-ui boxed">
            <form className="">

              <fieldset className="form-group">
                  <label className="text-primary">
                      {this.props.params.id  ? "Редактировать промо акции" : "Новая промо акция"}
                  </label>
              </fieldset>

                <fieldset className="form-group">
                    <div className="col-md-6">
                        <label>Скидка <span className="text-danger">*</span></label>
                        <div>
                            <div className="col-md-9">
                                  <NumberInput name="discount"
                                         value={this.state.promo.discount}
                                         onChange={this.onChange}
                                         toFixed={2}
                                         max={100}/>
                            </div>
                            <div className="col-md-3">%</div>
                        </div>
                    </div>
                </fieldset>

                <fieldset className={`form-group ${this.props.params.id ? 'hide' : ''}`} >
                    <div className="col-md-12">
                        <label>Тип <span className="text-danger">*</span></label>

                        <div className="radio">
                          <label>
                            <input type="radio" name="until" checked={this.state.promo.type == 'until'} onChange={this.onChange} />
                            Действителен (до)
                          </label>
                        </div>
                        <div className="radio">
                          <label>
                            <input type="radio" name="during" checked={this.state.promo.type == 'during'} onChange={this.onChange} />
                            Действителен (продолжительность)
                          </label>
                        </div>

                        {this.state.promo.type == 'during'
                            ? <div>
                                <fieldset>
                                    <label className="col-md-3">
                                        <NumberInput name="days" onChange={this.onTimeChange} />
                                        дней
                                    </label>
                                    <label className="col-md-3">
                                        <NumberInput name="hours" onChange={this.onTimeChange} />
                                        часов
                                    </label>
                                    <label className="col-md-3">
                                        <NumberInput name="minutes" onChange={this.onTimeChange} />
                                        минут
                                    </label>
                                    <label className="col-md-3">
                                        <NumberInput name="seconds" onChange={this.onTimeChange} />
                                        секунд
                                    </label>
                                </fieldset>
                            </div>
                            : <DateInput onChange={this.onChange}/>}
                    </div>
                </fieldset>

                 <fieldset className="product-form">
                    <div className="col-md-4">
                        <label>Промо код <span className="text-danger">*</span></label>
                        <div className="col-md-12">
                            <input name="code" type="text"
                                   value={this.state.promo.code}
                                   onChange={this.onChange}/>
                        </div>
                    </div>
                </fieldset>

                <fieldset className="boxed row product-form">
                    <div className="col-md-12">
                        <label>Выберите продукты, которые участвуют в акции
                            <span className="text-danger"> *</span>
                        </label>
                    </div>
                    <div>
                        <labe>
                            <input type="checkbox" name="checkAll" checked={self.state.checkAll} onChange={this.onChange}/>
                            выбрать все
                        </labe>
                        <hr/>
                    </div>
                    {this.state.products.map((item, index) => {
                        return <div className="col-md-3">
                                    <ProductItem item={item}
                                                 key={index}
                                                 checked={_.indexOf(self.state.promo.products, item.id)}
                                                 onChange={this.onChange}/>
                                </div>
                    })}
                </fieldset>

                <fieldset><div className="text-danger small">*Поля обязательные для заполнения</div></fieldset>

                <button type="button" className="btn btn-default btn-danger pull-left btn-submit"
                        onClick={this.props.params.id  ? this.edit : this.add}>{
                   this.props.params.id  ? "Редактировать" : "Добавить"}
                </button>
                <Link to={`/promo`}>
                    <div className="btn btn-danger pull-right btn-submit">Отмена</div>
                </Link>
            </form>
        </div>

    }


}


export default PromoForm;