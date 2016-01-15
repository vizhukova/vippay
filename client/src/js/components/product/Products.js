import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import ProductsStore from'./../../stores/ProductsStore';
import ProductsAction from'./../../actions/ProductsAction';
import _  from 'lodash';

class ProductItem extends React.Component {

    constructor(){
        super();
        this.state = {};
        this.removeProduct = this.removeProduct.bind(this);
        this.setAvailable = this.setAvailable.bind(this);
    }

    componentDidMount() {
        console.log(this.props.product);
    }

    removeProduct() {
        ProductsAction.removeProduct(this.props.product.id);
    }

    setAvailable() {
        var product = _.cloneDeep(this.props.product);
        product.available = !product.available;
        ProductsAction.editProduct(product);
    }

    render(){
        var available = "glyphicon glyphicon-ok-circle";
        var notAvailable = "glyphicon glyphicon-ban-circle";

        return <tr>
                    <td><img src={this.props.product.image} alt="image" width="200px" height="auto"/></td>
                    <td>{this.props.product.name}</td>
                    <td>{this.props.product.price}</td>
                    <td>{this.props.product.description}</td>
                    <td><button type="button" className="btn btn-default pull-right">
                        <a href={this.props.product.product_link} target="_blank">Ссылка на продукт</a></button></td>
                     <td><button type="button" className={this.props.product.available ? `btn btn-default ${available}` : `btn btn-default ${notAvailable}`} onClick={this.setAvailable}></button></td>
                    <td><Link to={`/category/${this.props.product.category_id}/products/${this.props.product.id}`}><button type="button" className="btn btn-default pull-right glyphicon glyphicon-pencil"></button></Link></td>
                    <td><button type="button" className="btn btn-default pull-right glyphicon glyphicon-remove" onClick={this.removeProduct}></button></td>
                </tr>
    }


}

class Products extends React.Component {

    constructor(){
        super();
        this.state = ProductsStore.getState();
        this.update = this.update.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.params.id) {
            var state = _.assign(this.state.product, {category_id: nextProps.params.id});
            this.setState(state);
            ProductsAction.getAllProducts(nextProps.params.id);
        }
    }

    componentDidMount() {
        this.setState({
            product: {
                category_id: this.props.params.id
            }
        });

        ProductsAction.getAllProducts(this.props.params.id);
        ProductsStore.listen(this.update);
    }

    componentWillUnmount() {
        ProductsStore.unlisten(this.update);
    }

    update(state){
        this.setState(state);
    }


    render(){
        var self = this;
        return <div>
            <Link to={`/category/${this.props.params.id}/products/new`}><button type="button" className="btn btn-default btn-block">Добавить продукт</button></Link>
            <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Изображение</th>
                    <th>Товар</th>
                    <th>Цена</th>
                    <th>Описание</th>
                    <th>Ссылка на продукт</th>
                    <th>Доступность</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                { this.state.products.map(function(item, index){
                return <ProductItem key={index} product={item} />
                })}
                </tbody>
            </table>
            </div>
    }


}


export default Products;