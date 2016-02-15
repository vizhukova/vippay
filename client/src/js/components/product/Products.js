import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import ProductsStore from'./../../stores/ProductsStore';
import ProductsAction from'./../../actions/ProductsAction';
import SettingsStore from'./../../stores/SettingsStore';
import List from'./../../../../../common/js/List';
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

        this.state = SettingsStore.getState();

        this.removeProduct = this.removeProduct.bind(this);
        this.setAvailable = this.setAvailable.bind(this);
        this.setActive = this.setActive.bind(this);
        this.update = this.update.bind(this);

        SettingsStore.listen(this.update);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        SettingsStore.unlisten(this.update);
    }

    update(state) {
        this.setState(state);
    }

    removeProduct() {
        ProductsAction.removeProduct(this.props.item.id);
    }

    setAvailable() {
        var product = _.cloneDeep(this.props.item);
        product.available = !product.available;
        ProductsAction.editProduct(product);
    }

    setActive() {
        var product = _.cloneDeep(this.props.item);
        product.active = !product.active;
        ProductsAction.editProduct(product);
    }

    render(){
        var available = "glyphicon glyphicon-ok-circle";
        var notAvailable = "glyphicon glyphicon-ban-circle";
        var currency = _.findWhere(this.state.currencies, {id: +this.props.item.currency_id});
        currency = currency ? currency.name : currency;


        return <tr>
                    <td>{this.props.item.name}</td>
                    <td>{this.props.item.price}</td>
                    <td>{currency}</td>
                    <td><a href={`/order/${this.props.item.id}`} target="_blank">{getAbsoluteUrl(`/order/${this.props.item.id}`)}</a></td>
                     <td className="action"><button type="button" className={this.props.item.available ? `btn btn-default btn-action ${available}` : `btn btn-default btn-action ${notAvailable}`} onClick={this.setAvailable}></button></td>
                     <td className="action"><button type="button" className={this.props.item.active ? `btn btn-default btn-action ${available}` : `btn btn-default btn-action ${notAvailable}`} onClick={this.setActive}></button></td>
                    <td className="action">
                        <Link to={`/category/${this.props.item.category_id}/products/${this.props.item.id}`} className="btn btn-default btn-action glyphicon glyphicon-pencil" />
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

        return <List
            title="Продукты"
            add_link={`/category/${this.props.params.id}/products/new`}
            error={this.state.error}
            items={this.state.products}
            perPage={5}
            itemComponent={ProductItem}
            isPaginate={true}
            thead={[
                {name: 'Товар', key: 'name'},
                {name: 'Цена', key: 'price'},
                {name: 'Валюта', key: ''},
                {name: 'Ссылка на продукт', key: ''},
                {name: 'Доступность', key: 'available'},
                {name: 'Активность', key: 'active'},
                {name: '', key: ''}
            ]}
        />
    }
}

export default Products;