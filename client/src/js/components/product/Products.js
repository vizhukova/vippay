import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import ProductsStore from'./../../stores/ProductsStore';
import ProductsAction from'./../../actions/ProductsAction';
import _  from 'lodash';


class Products extends React.Component {

    constructor(){
        super();
        this.state = ProductsStore.getState();
        this.update = this.update.bind(this);
        this.addNewProduct = this.addNewProduct.bind(this);
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
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                { this.state.products.map(function(item, index){
                return <tr key={index}>
                    <td><img src={item.image} alt="image" width="200px" height="auto"/></td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td><button type="button" className="btn btn-default pull-right">
                        <a href={item.product_link}>Ссылка на продукт</a></button></td>
                    <td><button type="button" className="btn btn-default pull-right glyphicon glyphicon-pencil"></button></td>
                    <td><button type="button" className="btn btn-default pull-right glyphicon glyphicon-remove"></button></td>
                </tr>
                })}
                </tbody>
            </table>
            </div>
    }


}


export default Products;