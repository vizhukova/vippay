import React from 'react';


class CurrencySelect extends React.Component {

    constructor(){
        super();
        this.state = {};
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.props.onChange({
            target: {
                name: "currency_id",
                value: e.target.value
            }
        });
    }


    render(){
        var self = this;
        return  <select className="form-control" id="sell"  name="currency_id"
                        value={this.props.current_currency}
                        onChange={self.onChange}
                        onClick = {self.props.onClick}>

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