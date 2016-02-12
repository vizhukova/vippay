import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import ProductsStore from'./../../stores/ProductsStore';
import ProductsAction from'./../../actions/ProductsAction';
import CategoriesStore from'./../../stores/CategoriesStore';
import CategoriesAction from'./../../actions/CategoriesAction';
import SettingsStore from'./../../stores/SettingsStore';
import CategorySelect from'./../ui/CategorySelect';
import CurrencySelect from'./../ui/CurrencySelect';
import Alert from './../../../../../common/js/Alert';
import NumberInput from './../../../../../common/js/NumberInput';
import Select from './../../../../../common/js/Select';
import AlertActions from './../../../../../common/js/AlertActions';
import _  from 'lodash';


class AddFields extends React.Component {

    constructor(){
        super();
        this.state = {};
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps){
         if(nextProps){
             this.setState(nextProps.delivery);
         }
        console.log('AddFields', this.state)
    }

    onChange(e) {
        var state = {};
        state[e.target.name] = e.target.value;
        _.assign(this.state, state);
        this.setState({});
       // this.setState(state);
        this.props.onChange({id: this.props.id, delivery: this.state})
    }

    render(){
        var self = this;
        return   <div className="form-group">
                    <label>Даные доставки</label>
                    <input type='text' className="form-control" name="condition"
                           value={this.state.condition}
                           onChange={this.onChange}
                           onClick={this.props.onClick}
                           onKeyDown={this.props.onKeyDown}/>

                    <label>Цена</label>
                    <NumberInput type='text' className="form-control" name="price"
                           value={this.state.price}
                           onChange={this.onChange}
                           onClick={this.props.onClick}
                           onKeyDown={this.props.onKeyDown}/>
                </div>
    }


}


class AddForm extends React.Component {

    constructor(){
        super();

          this.state = {
            delivery: [
                {condition: '',
                 price:''}
            ]
        };

        _.assign(this.state, ProductsStore.getState());

        this.onChange = this.onChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onDel = this.onDel.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.product.delivery) {
            _.assign(this.state, {delivery: nextProps.product.delivery}, {material: nextProps.product.material});
        }
        else {
            if(this.state.material != nextProps.product.material) this.setState({material: nextProps.product.material});
        }
        console.log('AddForm1', this.state)
    }

    onChange(state) {
        var delivery = this.state.delivery
        _.assign(delivery[state.id], state.delivery);
        this.setState({delivery: delivery});
        this.props.onChange({
                target: {
                    name: 'delivery',
                    value: this.state.delivery
                }
        });
    }

    onAdd(e) {
        e.preventDefault();
        var lastItem = this.state.delivery[this.state.delivery.length - 1];
        if(lastItem.condition.length == 0 || lastItem.price.length == 0
            || _.trim(lastItem.condition).length == 0 || _.trim(lastItem.price).length == 0) {
            AlertActions.set({
                type: 'error',
                title: 'Ошибка',
                text: 'Все поля доставки должны быть заполнены'
            })
            return;
        }
        var state = this.state.delivery;
        state.push({condition: '', price:''});
        this.setState({
            delivery: state
        })
        this.props.onClick();
    }

    onDel(e) {
        e.preventDefault();

        if(this.state.delivery.length <= 1) return;
        var state = this.state.delivery;
        state.pop();
        this.setState({
            delivery: state
        })
        this.props.onClick();
    }

    render(){
        var self = this;
        console.log('AddForm render', this.state);

        return  <div role="form" className={this.state.material ? '' : 'hide'}>
                  { this.state.delivery.map(function(item, index){
                    return  <div>
                                <AddFields id={index} key={index} delivery={item}
                                           onChange={self.onChange}
                                           onKeyDown={self.props.onKeyDown}
                                           onClick={self.props.onClick}/>
                        <hr />
                        </div>
                    })}
                  <button type="submit" className="btn btn-danger glyphicon glyphicon-minus pull-right" onClick={this.onDel}></button>
                  <button type="submit" className="btn btn-success glyphicon glyphicon-plus pull-left" onClick={this.onAdd}></button>
                </div>
    }
}


class ProductForm extends React.Component {

    constructor(){
        super();
        this.state = CategoriesStore.getState();
        _.assign(this.state, ProductsStore.getState(), SettingsStore.getState());
        this.update = this.update.bind(this);
        this.addNewProduct = this.addNewProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeCurrency = this.onChangeCurrency.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onError = this.onError.bind(this);

    }

    componentDidMount() {
        var self = this;
        console.log('PROOPS',this.props)
        if(!this.props.params.prod_id) {

            this.setState({
                product: {
                category_id: this.props.params.id,
                available: true,
                active: true,
                material: false,
                description: ''
            }
            });

        } else {
            ProductsAction.getCurrentProduct(this.props.params.prod_id);
        }

        console.log('ProductForm - componentDidMount', this.state.product)

        CategoriesStore.listen(this.update);
        ProductsStore.listen(this.update);
        SettingsStore.listen(this.update);
        CategoriesAction.getAllCategories();
    }

    onKeyDown(e) {
        if(e.keyCode == 13) {
            this.props.params.prod_id ? this.editProduct() : this.addNewProduct()
        }
    }

    componentWillUnmount() {
        CategoriesStore.unlisten(this.update);
        ProductsStore.unlisten(this.update);
        SettingsStore.unlisten(this.update);
    }

    checkFields() {
        if(this.state.product.material ) {

           if( !this.state.product.delivery) return false;

            var result = this.state.product.delivery.filter((item) => {
                return item.condition.length == 0 || item.price.length == 0 ||
                    _.trim(item.condition).length == 0 || _.trim(item.price).length == 0
            })

            if (result.length > 0) return false;
        }

        return this.state.product.name &&  this.state.product.product_link &&
                this.state.product.price && this.state.product.name.length > 0
                && this.state.product.product_link.length > 0 && this.state.product.price.length > 0

    }

    addNewProduct() {
        var self = this;
        if(this.checkFields()) {
            ProductsAction.addNewProduct(this.state.product).then(() => {
                history.back();

            }).catch((err) => {
                AlertActions.set({
                        type: 'error',
                        title: 'Ошибка',
                        text: 'Проверьте правильность заполнения данных. Возможно такой товар уже существует'
                })

            })

        } else {
           AlertActions.set({
                        type: 'error',
                        title: 'Ошибка',
                        text: 'Проверьте правильность заполнения данных. Возможно такой товар уже существует'
                })
        }
    }

    editProduct() {
        var self = this;

        if(this.checkFields()) {
            ProductsAction.editProduct(this.state.product).then((data) => {
                history.back();

            }).catch((err) => {
                debugger
               AlertActions.set({
                        type: 'error',
                        title: 'Ошибка',
                        text: 'Проверьте правильность заполнения данных.'
                })
        })
    } else {
           AlertActions.set({
                        type: 'error',
                        title: 'Ошибка',
                        text: 'Проверьте правильность заполнения данных. Возможно такой товар уже существует'
                })
        }
    }

    onError(error) {
        this.setState({
            error: error
        })
    }

    update(state){
        if(state.product) _.assign(this.state.product, state.product);
        _.assign(this.state, _.omit(state, ['product']));
        this.setState({});
    }

    onChange(e) {
        var state = {};
        //if(e.target.name =="currency_id") state["currency_name"] =  this.state.currencies[e.target.value].name;
        if(e.target.name == "available")  state[e.target.name] =  e.target.checked;
        else if(e.target.name == "active")  state[e.target.name] =  e.target.checked;
        else if(e.target.name == "material")  state[e.target.name] =  e.target.checked;
		else state[e.target.name] =  e.target.value;
        _.assign(this.state.product, state);
        this.setState({});
    }

    onChangeCurrency(e) {
        var state = {};
        state['currency_id'] =  e.target.value;
        _.assign(this.state.product, state);
        this.setState({});
    }

    onChangeCategory(e) {
        debugger
        var state = {};
        state['category_id'] =  e.target.value;
        _.assign(this.state.product, state);
        this.setState({});
    }

    onClick(e) {
        AlertActions.hide();
    }


    render(){
        var self = this;
        var edit = this.props.params.prod_id;
        console.log('ProductForm basicCurrency', this.state.basicCurrency)
        if(!this.state.product.currency_id) this.state.product.currency_id = this.state.basicCurrency;

         return <form className="col-sm-7 form-ui table-wrapper">
            <fieldset className="product-form">

                <label className="text-warning">Новый продукт <span className="text-danger"> * </span></label>
                <input type="text" name="name"
                       className="form-control" id="name"
                       onChange={this.onChange}
                       onKeyDown={this.onKeyDown}
                       onClick = {this.onClick} placeholder="Введите название нового продукта"
                       value={this.state.product.name}/>

                <label className="text-warning">Цена  <span className="text-danger"> * </span></label>
                <NumberInput type="text" name="price"
                       className="form-control" id="price"
                       onChange={this.onChange}
                       onKeyDown={this.onKeyDown}
                       onClick = {this.onClick} placeholder="Введите цену"
                       value={this.state.product.price}/>

                 <label className="text-warning">Валюта</label>
                 <Select values={this.state.currencies}
                    current_value={this.state.product.currency_id}
                    fields={{
                        name: 'name',
                        value: 'id'
                    }}
                    onChange={this.onChangeCurrency}
                 />

                <label className="text-warning">Категория</label>
                <Select values={this.state.categories}
                    current_value={this.state.product.category_id}
                    fields={{
                        name: 'category',
                        value: 'id'
                    }}
                    onChange={this.onChangeCategory}
                 />

                <div className="checkbox">
                  <label className="text-warning">
                      <input name="available"
                         checked={this.state.product.available} type="checkbox"
                         onChange={this.onChange}
                         onClick = {this.onClick}/>
                      Доступность</label>
                </div>

                <div className="checkbox">
                  <label className="text-warning">
                      <input name="active"
                             checked={this.state.product.active}
                             type="checkbox"
                             onChange={this.onChange}
                             onClick = {this.onClick}/>
                      Активность</label>
                </div>

                <label className="text-warning">Ссылка на картинку</label>
                <input type="text" name="image" className="form-control" id="image"
                       onChange={this.onChange}
                       onKeyDown={this.onKeyDown}
                       onClick = {this.onClick}
                       placeholder="Введите ссылку на картинку"
                       value={this.state.product.image}/>

                <label className="text-warning">Ссылка на продукт <span className="text-danger"> * </span></label>
                <input type="text" name="product_link" className="form-control" id="product_link"
                       onChange={this.onChange}
                       onKeyDown={this.onKeyDown}
                       onClick = {this.onClick}
                       placeholder="Введите ссылку на продукт"
                       value={this.state.product.product_link}/>

                <label className="text-warning">Описание:</label>
                <textarea className="form-control" id="description" name="description"
                          onChange={this.onChange}
                          onKeyDown={this.onKeyDown}
                          onClick = {this.onClick}
                          value={this.state.product.description}></textarea>

                <div className="checkbox">
                  <label className="text-warning">
                      <input name="material"  type="checkbox"
                             checked={this.state.product.material}
                             onChange={this.onChange}
                             onClick = {this.onClick}/>
                      Доставляемый</label>
                </div>

                 <AddForm onChange={this.onChange}
                          onClick = {this.onClick}
                          onKeyDown={this.onKeyDown}
                          product={this.state.product}
                          onError={this.onError}  />

            </fieldset>
             <fieldset><div className="text-danger small">*Поля обязательные для заполнения</div></fieldset>


             <Link to={`/category/${this.props.params.id}/products`}>
                 <button type="button" className="btn btn-danger pull-right btn-submit">
                     {"Отмена"}
                 </button>
             </Link>

             <button type="button" className="btn btn-warning pull-left btn-submit" onClick={edit ? this.editProduct : this.addNewProduct}>{
                edit ? "Редактировать" : "Добавить"}
            </button>
        </form>
    }
}

export default ProductForm;
