import React from 'react';

/**
 * Абстрактный компонент выбора
 */
class Select extends React.Component {

    constructor(){
        super();
        this.state = {};
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.props.onChange({
            target: {
                name: this.props.fields['name'],
                value: e.target.value
            }
        });
    }


    render(){

        var self = this;
        return <div className={this.props.className ? this.props.className : ''}>
            <select className="form-control "  type="text" id="sell" name="currency_id"
                    value={this.props.current_value}
                    onChange={self.onChange}>

                { this.props.values.map(function (item, index) {
                    return <option
                        key={index}
                        value={ item[ self.props.fields['value'] ] }
                    >{ item[ self.props.fields['name'] ] }</option>
                })}

            </select>
        </div>
    }


}


export default Select;