import React from 'react';
import AddFields from './AddFields';
import ProductsStore from'./../../stores/ProductsStore';
import _  from 'lodash';


class AddForm extends React.Component {

    constructor(){
        super();
        var state = ProductsStore.getState();
            this.state = {
            delivery: [
                {condition: '',
                 price:''}
            ]
        };
        _.assign(this.state, ProductsStore.getState());

        this.onChange = this.onChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }

    componentDidMount() {

    }

    onChange(state) {
        var delivery = this.state.delivery
        _.assign(delivery[state.id], state.delivery);
        this.setState({delivery: delivery});
        this.props.onChange({
                target: {
                    name: 'delivery',
                    value: this.state.delivery
                }
        });
    }

    onAdd() {
        var state = this.state.delivery;
        state.push({condition: '', price:''});
        this.setState({
            delivery: state
        })
    }

    render(){
        var self = this;
        return  <div role="form" className={this.state.product.material ? '' : 'hide'}>
                  { this.state.delivery.map(function(item, index){
                    return  <AddFields id={index} key={index} onChange={self.onChange}/>
                    })}
                  <button type="submit" className="btn btn-success glyphicon glyphicon-plus pull-right" onClick={this.onAdd}></button>
                </div>
    }


}


export default AddForm;