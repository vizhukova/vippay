import React from 'react';


class CurrencySelect extends React.Component {

    constructor(){
        super();
        this.state = {};
    }

    /*componentDidMount(){
        this.setState({
            current: this.props.currencies.filter(function(item){return item.basic;})
        })
    }

    componentWillReceiveProps(props){
        this.setState({
            current: this.props.currencies.filter(function(item){return item.basic;})
        })
    }*/

    render(){
        var self = this;
        return  <select className="form-control" id="sell"  name="currency_id"
                        value={this.props.current_currency} onChange={this.props.onChange}>
                    { this.props.currencies.map(function(item, index){
                        return <option
                            key={index}
                            value={item.id}
                        >{item.name}</option>
                        })}
                </select>
    }


}


export default CurrencySelect;