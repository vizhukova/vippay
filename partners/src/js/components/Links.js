import React from 'react';
import ProductsActions from'./../actions/ProductsActions';
import ProductsStore from'./../stores/ProductsStore';

/**
 * Список продуктов партнёра
 */
class Products extends React.Component {

    constructor(){
        super();
        this.state = ProductsStore.getState();
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        ProductsStore.listen(this.update);
        ProductsActions.getProducts();
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
            itemComponent={ProductItem}
            isPaginate={true}
            thead={[
                {name: 'Товар', key: 'name'},
                {name: 'Дополнительные материалы', key: ''},
                {name: 'Описание', key: ''},
                {name: 'Ссылка на продукт', key: ''}
            ]}
            />

    }


}


export default Products;