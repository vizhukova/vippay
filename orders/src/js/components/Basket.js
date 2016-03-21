import React from 'react';
import {RoutingContext, Link} from 'react-router';
import List from './../../../../common/js/List';
import NumberInput from './../../../../common/js/NumberInput';
import BasketStore from './../stores/BasketStore';
import BasketActions from './../actions/BasketActions';
import _ from 'lodash';

class BasketItem extends React.Component {

    constructor() {
        super();
        this.state = {};

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
       var item = _.clone(this.props.item);
        item.quantity = e.target.value;
       this.props.onChange({
           target: {
               name: 'quantity',
               item: item
           }
       });
    }

    render() {
        console.log('BASKET ITEM', this.props);

        return <tr>
            <td><img src={this.props.item.product.image} width="100px" height="auto"/></td>
            <td>{this.props.item.product.name}</td>
            <td>{this.props.item.product.description}</td>
            <td>{this.props.item.product.price}</td>
            <td>
                <NumberInput  min={1} value={this.props.item.quantity} name="quantity" onChange={this.onChange} />
            </td>
        </tr>
    }
}


class Basket extends React.Component {

    constructor() {
        super();
        this.state = BasketStore.getState();
        this.update = this.update.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    update(state) {
        this.setState(state);
    }

    componentDidMount() {
        BasketStore.listen(this.update);

        var arr = location.pathname.split('/');
        this.setState({
            basket_id: arr[arr.length - 1]
        });

        BasketActions.get(arr[arr.length - 1]);
    }

    onChange(e) {
        if(e.target.name == 'quantity') {
            var index = _.findIndex(this.state.products, {id: e.target.item.id});
            this.state.products[index] = e.target.item;
        }

        this.setState({});
    }


    render() {
        var self = this;
        console.log(this.state.products)
        return <table className="table table-hover list">
                                <thead>
                                <tr>
                                    <th>Изображение</th>
                                    <th>Название</th>
                                    <th>Описание</th>
                                    <th>Цена</th>
                                    <th>Количество</th>
                                </tr>
                                </thead>
                            <tbody>
                            { this.state.products.map(function (item, index) {
                                return <BasketItem item={item} key={index} onChange={self.onChange}/>
                            })}
                            </tbody>
                        </table>

    }
}

export default Basket;