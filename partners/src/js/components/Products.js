import React from 'react';
import ProductsActions from'./../actions/ProductsActions';
import ProductsStore from'./../stores/ProductsStore';
import List from'./../../../../common/js/List';


class ProductItem extends React.Component {

    constructor() {
        super();
    }

    render() {
        return <tr>
            <td><img src={this.props.item.image} alt="image" width="200px" height="auto"/></td>
            <td>{this.props.item.name}</td>
            <td>{this.props.item.price}</td>
            <td>{this.props.item.currency_name}</td>
            <td>{this.props.item.description}</td>
            <td><a href={this.props.item.ref_link}>Ссылка</a></td>
        </tr>
    }
}

class Products extends React.Component {

    constructor(){
        super();
        this.state = ProductsStore.getState();
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        ProductsStore.listen(this.update);
        ProductsActions.getAll();
    }

    componentWillUnmount() {
        ProductsStore.unlisten(this.update);
    }

    update(state) {
        console.log('STAAAATE', state)
        this.setState(state);
    }


    render(){

        return <List
            title="Продукты"
            error={this.state.error}
            items={this.state.products}
            perPage={3}
            itemComponent={ProductItem}
            thead={['Изображение', 'Товар', 'Цена', 'Валюта', 'Описание', 'Ссылка на продукт']}
            thead={[
                {name: 'Изображение', key: ''},
                {name: 'Товар', key: 'name'},
                {name: 'Цена', key: 'price'},
                {name: 'Валюта', key: 'currency_name'},
                {name: 'Описание', key: ''},
                {name: 'Ссылка на продукт', key: ''}
            ]}
            />

    }


}


export default Products;

/*
<div>
                <table className="table table-hover table-wrapper">
                    <thead>
                      <tr>
                        <th>Изображение</th>
                        <th>Товар</th>
                        <th>Цена</th>
                        <th>Валюта</th>
                        <th>Описание</th>
                        <th>Ссылка на продукт</th>
                      </tr>
                    </thead>
                    <tbody>
                    { this.state.products.map(function(item, index){
                    return <tr key={index}>
                        <td><img src={item.image} alt="image" width="200px" height="auto"/></td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.currency_name}</td>
                        <td>{item.description}</td>
                        <td><a href={item.ref_link}>Ссылка</a></td>
                    </tr>
                    })}
                    </tbody>
                </table>
                </div>
 */