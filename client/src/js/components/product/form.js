import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import ProductsStore from'./../../stores/ProductsStore';
import ProductsAction from'./../../actions/ProductsAction';
import CategoriesStore from'./../../stores/CategoriesStore';
import CategoriesAction from'./../../actions/CategoriesAction';
import SettingsStore from'./../../stores/SettingsStore';
import CategorySelect from'./../ui/CategorySelect';
import CurrencySelect from'./../ui/CurrencySelect';
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
                    <input type='text' className="form-control" value={this.state.condition} name="condition" onChange={this.onChange}/>
                    <label>Цена</label>
                    <input type='text' className="form-control" value={this.state.price} name="price" onChange={this.onChange}/>
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
        var state = this.state.delivery;
        state.push({condition: '', price:''});
        this.setState({
            delivery: state
        })
    }

    onDel(e) {
        e.preventDefault();
        var state = this.state.delivery;
        state.pop();
        this.setState({
            delivery: state
        })
    }

    render(){
        var self = this;
        console.log('AddForm render', this.state);

        return  <div role="form" className={this.state.material ? '' : 'hide'}>
                  { this.state.delivery.map(function(item, index){
                    return  <AddFields id={index} key={index} delivery={item} onChange={self.onChange}/>
                    })}
                  <button type="submit" className="btn btn-success glyphicon glyphicon-plus pull-right" onClick={this.onAdd}></button>
                  <button type="submit" className="btn btn-danger glyphicon glyphicon-minus pull-left" onClick={this.onDel}></button>
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

    }

    componentDidMount() {
        var self = this;
        if(!this.props.params.prod_id) {

            this.setState({
                product: {
                category_id: this.props.params.id,
                available: true,
                material: false
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

    componentWillUnmount() {
        CategoriesStore.unlisten(this.update);
        ProductsStore.unlisten(this.update);
        SettingsStore.unlisten(this.update);
    }

    checkFields() {
        /*var counter = 0;
        console.log(this.state.product)
        var result = _.every(this.state.product, function(item, index) {
           counter++;
           return item.length != 0;
       })
        if(!result || counter < 7) {alert("Все поля должы быть заполнены"); return false;}
        return true;*/
        return true;
    }

    addNewProduct() {
        if(this.checkFields()) {
            ProductsAction.addNewProduct(this.state.product);
            history.back();
        }
    }

    editProduct() {
        if(this.checkFields()) {
            ProductsAction.editProduct(this.state.product);
            history.back();
        }
    }

    update(state){
        _.assign(this.state, state);
        this.setState({});
        console.log('state product form', state)
    }

    onChange(e) {
        var state = {};
        //if(e.target.name =="currency_id") state["currency_name"] =  this.state.currencies[e.target.value].name;
        if(e.target.name == "available")  state[e.target.name] =  e.target.checked;
        else if(e.target.name == "material")  state[e.target.name] =  e.target.checked;
		else state[e.target.name] =  e.target.value;
        _.assign(this.state.product, state);
        this.setState({});
    }


    render(){
        var self = this;
        var edit = this.props.params.prod_id;
        console.log('ProductForm', this.state.product)

         return <form className="col-sm-7 col-md-offset-2">
            <fieldset className="product-form">
                <label className="text-warning">Новый продукт</label>
                <input type="text" name="name" className="form-control" id="name" onChange={this.onChange}
                       placeholder="Введите название нового продукта" value={this.state.product.name}/>
                <label className="text-warning">Цена</label>
                <input type="text" name="price" className="form-control" id="price" onChange={this.onChange}
                       placeholder="Введите цену" value={this.state.product.price}/>
                 <label className="text-warning">Валюта</label>
                <CurrencySelect currencies={this.state.currencies} onChange={this.onChange}
                                current_currency={this.state.product.currency_id}/>
                <label className="text-warning">Категория</label>
                <CategorySelect categories={this.state.categories} current_category={this.state.product.category_id}
                                onChange={this.onChange}/>
                <div className="checkbox">
                  <label className="text-warning"><input name="available" checked={this.state.product.available}
                  type="checkbox" onChange={this.onChange} />Доступность</label>
                </div>
                <label className="text-warning">Ссылка на картинку</label>
                <input type="text" name="image" className="form-control" id="image" onChange={this.onChange}
                       placeholder="Введите ссылку на картинку" value={this.state.product.image}/>
                <label className="text-warning">Ссылка на продукт</label>
                <input type="text" name="product_link" className="form-control" id="product_link"
                       onChange={this.onChange}
                       placeholder="Введите ссылку на продукт" value={this.state.product.product_link}/>
                <label className="text-warning">Описание:</label>
                <textarea className="form-control" id="description" name="description"
                          onChange={this.onChange} value={this.state.product.description}></textarea>
                <div className="checkbox">
                  <label className="text-warning"><input name="material" checked={this.state.product.material}
                  type="checkbox" onChange={this.onChange} />Доставляемый</label>
                </div>
                 <AddForm onChange={this.onChange} product={this.state.product} />
            </fieldset>
             <Link to={`/category/${this.props.params.id}/products`}><button type="button" className="btn btn-danger pull-right">{
                "Отмена"}
            </button></Link>
             <button type="button" className="btn btn-warning pull-left" onClick={edit ? this.editProduct : this.addNewProduct}>{
                edit ? "Редактировать" : "Добавить"}
            </button>
        </form>
    }
}

export default ProductForm;
