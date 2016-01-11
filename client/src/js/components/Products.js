import React from 'react';
import ProductsStore from'./../stores/ProductsStore';
import ProductsActions from'./../actions/ProductsAction';


class Products extends React.Component {

    constructor(){
        super();
        this.state = ProductsStore.getState();
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        ProductsStore.listen(this.update);
        ProductsActions.getProductsByCategory();
    }

    componentWillUnmount() {
        ProductsStore.unlisten(this.update);
    }

    update(state){
        console.log(state.products)
        this.setState(state);
    }


    render(){
        return <div>
                <button type="button" className="btn btn-default btn-block">Добавить продукт</button>
                <button type="button" className="btn btn-default btn-block">Редактировать продукты</button>
                <table className="table table-hover">
                <tbody>
                { this.state.products.map(function(i, index){
                return <tr key={index}>
                    <td><img src="" alt="image"/></td>
                    <td>Продукт</td>
                    <td><button type="button" className="btn btn-default pull-right">X</button></td>
                </tr>
                })}
                </tbody>
            </table>
            </div>
    }


}


export default Products;