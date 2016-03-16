import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import ProductsStore from'./../../stores/ProductsStore';
import ProductsAction from'./../../actions/ProductsAction';
import SettingsStore from'./../../stores/SettingsStore';
import List from'./../../../../../common/js/List';
import ModalActions from'./../../../../../common/js/ModalWindow/ModalActions';
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
        this.setModelData = this.setModelData.bind(this);
    }

    componentDidMount() {
        SettingsStore.listen(this.update);
    }

    componentWillUnmount() {
        SettingsStore.unlisten(this.update);
    }

    update(state) {
        this.setState(state);
    }

    removeProduct() {
        if(! this.props.isActiveTariff) return;
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

    setModelData(e) {
        debugger
        ModalActions.set({data: this.props.item.materials || [], name: 'Materials'});
    }

    render(){
        var available = "glyphicon glyphicon-ok-circle btn btn-default btn-action";
        var notAvailable = "glyphicon glyphicon-ban-circle btn btn-danger btn-action";
        var currency = _.findWhere(this.state.currencies, {id: +this.props.item.currency_id});
        var materials = this.props.item.materials || [];
        currency = currency ? currency.name : currency;
        var src = `http://${document.location.hostname}/api/basket/${this.props.item.id}?_method=PUT`;

        return <tr>
                     <td>{this.props.item.name}</td>
                     <td><a href={`/order/${this.props.item.id}`} target="_blank">{getAbsoluteUrl(`/order/${this.props.item.id}`)}</a></td>
                     <td>{`${parseFloat(this.props.item.price).toFixed(2)} ${currency}`}</td>
                     <td>
                        { materials.length > 0
                          ? <button type="button" className="btn btn-default btn-action glyphicon glyphicon-eye-open" onClick={this.setModelData} />
                          : '-'}
                     </td>
                     <td className="action"><button type="button" className={this.props.item.available ? available : notAvailable} onClick={this.setAvailable} /></td>
                     <td className="action"><button type="button" className={this.props.item.active ? available : notAvailable} onClick={this.setActive} /></td>
                     <td>
                         <form method="POST" action={src} enctype="application/x-www-form-urlencoded">
                            <input type="hidden" name="_method" value="PUT" />
                            <input type="hidden" name="redirect_link" value={document.location.href} />
                            <input type="submit" value="Добавить в корзину"/>
                         </form>

                     </td>
                     <td className="action">
                        <Link to={`/category/${this.props.item.category_id}/products/${this.props.item.id}`}
                              className={`btn btn-default btn-action glyphicon glyphicon-pencil
                              ${this.props.isActiveTariff ? '' : 'disabled'}`}/>
                        <button type="button" className={`btn btn-danger btn-action pull-right glyphicon glyphicon-remove
                        ${this.props.isActiveTariff ? '' : 'disabled'}`} onClick={this.removeProduct} />
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
            title="Товары"
            add_link={`/category/${this.props.params.id}/products/new`}
            add_link_name = 'Добавить товар'
            error={this.state.error}
            items={this.state.products}
            itemComponent={ProductItem}
            isPaginate={true}
            thead={[
                {name: 'Товар', key: 'name'},
                {name: 'Ссылка на продукт', key: ''},
                {name: 'Цена', key: 'price'},
                {name: 'Дополнительные материалы', key: ''},
                {name: 'Доступность', key: 'available'},
                {name: 'Активность', key: 'active'},
                {name: 'Код формы', key: ''},
                {name: '', key: ''}
            ]}
        />
    }
}

export default Products;