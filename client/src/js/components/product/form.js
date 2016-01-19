import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import ProductsStore from'./../../stores/ProductsStore';
import ProductsAction from'./../../actions/ProductsAction';
import CategoriesStore from'./../../stores/CategoriesStore';
import CategoriesAction from'./../../actions/CategoriesAction';
import CategorySelect from'./../ui/CategorySelect';
import CurrencySelect from'./../ui/CurrencySelect';
import AddForm from'./../ui/AddForm';
import _  from 'lodash';


class ProductForm extends React.Component {

    constructor(){
        super();
        this.state = CategoriesStore.getState();
        _.assign(this.state, ProductsStore.getState());
        this.update = this.update.bind(this);
        this.addNewProduct = this.addNewProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    componentDidMount() {
        this.setState({
            product: {
                category_id: this.props.params.id,
                available: true,
                material: false
            },
        });

        console.log(this.props.params)
        if(this.props.params.prod_id) ProductsAction.getCurrentProduct(this.props.params.prod_id);

        CategoriesStore.listen(this.update);
        ProductsStore.listen(this.update);
        CategoriesAction.getAllCategories();
        ProductsAction.getAllCurrencies();
    }

    componentWillUnmount() {
        CategoriesStore.unlisten(this.update);
        ProductsStore.unlisten(this.update);
    }

    checkFields() {
        var counter = 0;
        console.log(this.state.product)
        var result = _.every(this.state.product, function(item, index) {
           counter++;
           return item.length != 0;
       })
        if(!result || counter < 7) {alert("Все поля должы быть заполнены"); return false;}
        return true;
    }

    addNewProduct() {
        debugger
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
        this.setState({})
    }

    onChange(e) {
        var state = {};
        if(e.target.name == "available")  state[e.target.name] =  e.target.checked;
        if(e.target.name == "material")  state[e.target.name] =  e.target.checked;
		else state[e.target.name] =  e.target.value;
        _.assign(this.state.product, state);
        this.setState({});
    }


    render(){
        var self = this;
        var edit = this.props.params.prod_id;

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
