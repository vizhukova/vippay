import React from 'react';


class NumberInput extends React.Component {

    constructor(){
        super();
        this.state = {};
    }

    componentDidMount(){

    }

    render(){
        var self = this;
        return  <div>
                    <input type="number" className="form-control input-lg" name={this.props.name} value={this.props.value} onChange={this.props.onChange}/>
                </div>
    }


}


export default NumberInput;