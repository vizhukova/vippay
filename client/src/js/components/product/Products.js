import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import ProductsStore from'./../../stores/ProductsStore';
import ProductsAction from'./../../actions/ProductsAction';
import SettingsStore from'./../../stores/SettingsStore';

import _  from 'lodash';

var getAbsoluteUrl = (function() {
	var a;

	return function(url) {
		if(!a) a = document.createElement('a');
		a.href = url;

		return a.href;
	};
})();

class ProductItem extends React.Component {

    constructor(){
        super();
        this.removeProduct = this.removeProduct.bind(this);
        this.setAvailable = this.setAvailable.bind(this);
        this.setActive = this.setActive.bind(this);
    }

    removeProduct() {
        ProductsAction.removeProduct(this.props.product.id);
    }

    setAvailable() {
        var product = _.cloneDeep(this.props.product);
        product.available = !product.available;
        ProductsAction.editProduct(product);
    }

    setActive() {
        var product = _.cloneDeep(this.props.product);
        product.active = !product.active;
        ProductsAction.editProduct(product);
    }

    render(){
        var available = "glyphicon glyphicon-ok-circle";
        var notAvailable = "glyphicon glyphicon-ban-circle";

        return <tr>
                    <td>{this.props.product.name}</td>
                    <td>{this.props.product.price}</td>
                    <td>{this.props.currency}</td>
                    <td><a href={`/order/${this.props.product.id}`} target="_blank">{getAbsoluteUrl(`/order/${this.props.product.id}`)}</a></td>
                     <td className="action"><button type="button" className={this.props.product.available ? `btn btn-default btn-action ${available}` : `btn btn-default btn-action ${notAvailable}`} onClick={this.setAvailable}></button></td>
                     <td className="action"><button type="button" className={this.props.product.active ? `btn btn-default btn-action ${available}` : `btn btn-default btn-action ${notAvailable}`} onClick={this.setActive}></button></td>
                    <td className="action">
                        <Link to={`/category/${this.props.product.category_id}/products/${this.props.product.id}`} className="btn btn-default btn-action glyphicon glyphicon-pencil" />
                        <button type="button" className="btn btn-danger btn-action pull-right glyphicon glyphicon-remove" onClick={this.removeProduct} />
                    </td>
                </tr>
    }


}

class Products extends React.Component {

    constructor(){
        super();
        this.state = ProductsStore.getState();
        _.assign(this.state,SettingsStore.getState());
        this.update = this.update.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.params.id) {
             _.assign(this.state.product, {category_id: nextProps.params.id});
            this.setState({});
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
        SettingsStore.listen(this.update);
    }

    componentWillUnmount() {
        ProductsStore.unlisten(this.update);
        SettingsStore.unlisten(this.update);
    }

    update(state){
        this.setState(state);
    }


    render(){
        var self = this;
        return <div>

            <div className="row">
                <div className="col-sm-12">
                    <div className="table-wrapper">

                        <div className="table-head">
                        <span className="title">
                            Продукты
                        </span>
                            <Link to={`/category/${this.props.params.id}/products/new`}
                                  className="btn btn-action-big btn-default glyphicon glyphicon-plus" />
                        </div>
                        <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>Товар</th>
                                <th>Цена</th>
                                <th>Валюта</th>
                                <th>Ссылка на продукт</th>
                                <th>Доступность</th>
                                <th>Активность</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                            { this.state.products.map(function(item, index){
                                var currency = _.findWhere(self.state.currencies, {id: +item.currency_id});
                                console.log('currency_render:', currency, self.state.currencies,  item.currency_id);
                                currency  = currency  ? currency.name : currency;

                                return <ProductItem key={index} product={item} currency={currency} />
                            })}
                            </tbody>
                        </table>

                        <div className="table-footer">

                        </div>

                    </div>
                </div>


            </div>

            </div>
    }


}


export default Products;