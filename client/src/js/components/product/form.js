import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import ProductsStore from'./../../stores/ProductsStore';
import ProductsAction from'./../../actions/ProductsAction';
import CategoriesStore from'./../../stores/CategoriesStore';
import CategoriesAction from'./../../actions/CategoriesAction';
import CategorySelect from'./../ui/CategorySelect';
import _  from 'lodash';


class ProductForm extends React.Component {

    constructor(){
        super();
        this.state = CategoriesStore.getState();
        _.assign(this.state, ProductsStore.getState());
        this.update = this.update.bind(this);
        this.addNewProduct = this.addNewProduct.bind(this);
        this.onChange = this.onChange.bind(this);
        console.log(this.props)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.params.id) {
            var state = _.assign(this.state.product, {category_id: nextProps.params.id});
            this.setState(state);
        }
    }

    componentDidMount() {
        this.setState({
            product: {
                category_id: this.props.params.id
            }
        });

        CategoriesStore.listen(this.update);
        CategoriesAction.getAllCategories();
    }

    componentWillUnmount() {
        CategoriesStore.unlisten(this.update);
    }

    addNewProduct() {
        console.log(this.state)
        var counter = 0;
        var result = _.every(this.state.product, function(item, index) {
           counter++;
           return item.length != 0;
       })
        if(!result || counter < 6) {alert("Все поля должы быть заполнены"); return;}

        console.log(this.props.params.id)
        ProductsAction.addNewProduct(this.state.product);
    }

    update(state){
        this.setState(state);
    }

    onChange(e) {
        var state = {};
		state[e.target.name] =  e.target.value;
        _.assign(this.state.product, state);
        this.setState({});
    }


    render(){
        var self = this;

         return <form className="col-sm-7 col-md-offset-2">
            <fieldset className="product-form">
                <label className="text-warning">Новый продукт</label>
                <input type="text" name="name" className="form-control" id="name" onChange={this.onChange}
                       placeholder="Введите название нового продукта"/>
                <label className="text-warning">Цена</label>
                <input type="text" name="price" className="form-control" id="price" onChange={this.onChange}
                       placeholder="Введите цену"/>
                <label className="text-warning">Категория</label>
                <CategorySelect categories={this.state.categories} current_category={this.props.params.id}
                                onChange={this.onChange}/>
                <label className="text-warning">Ссылка на картинку</label>
                <input type="text" name="image" className="form-control" id="image" onChange={this.onChange}
                       placeholder="Введите ссылку на картинку"/>
                <label className="text-warning">Ссылка на продукт</label>
                <input type="text" name="product_link" className="form-control" id="product_link"
                       onChange={this.onChange}
                       placeholder="Введите ссылку на продукт"/>
                <label className="text-warning">Описание:</label>
                <textarea className="form-control" id="description" name="description"
                          onChange={this.onChange}></textarea>
            </fieldset>
             <Link to={`/category/${this.props.params.id}/products`}><button type="button" className="btn btn-danger pull-right">{
                "Отмена"}
            </button></Link>
             <button type="button" className="btn btn-warning pull-left" onClick={this.addNewProduct}>{
                "Добавить"}
            </button>
        </form>
    }
}

export default ProductForm;
