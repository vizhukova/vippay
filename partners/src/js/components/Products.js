import React from 'react';
import ProductsActions from'./../actions/ProductsActions';
import ProductsStore from'./../stores/ProductsStore';


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

    update(state) {
        this.setState(state);
        console.log(state)
    }


    render(){
        var available = "glyphicon glyphicon-ok-circle";
        var notAvailable = "glyphicon glyphicon-ban-circle";

        return <div>
            <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Изображение</th>
                    <th>Товар</th>
                    <th>Цена</th>
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
                    <td>{item.description}</td>
                    <td><a href={item.ref_link}>Ссылка</a></td>
                </tr>
                })}
                </tbody>
            </table>
            </div>

    }


}


export default Products;