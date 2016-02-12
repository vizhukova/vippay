import React from 'react';


class NumberInput extends React.Component {

    constructor(){
        super();
        this.state = {};
    }

    componentDidMount(){

    }

    onKeyDown(e) {
        if(e.keyCode == 107 || e.keyCode == 109 || e.keyCode == 69) e.preventDefault();
    }

    render(){
        var self = this;
        return  <div>
                    <input type="number" className="form-control input-lg" name={this.props.name} value={this.props.value} onKeyDown={this.onKeyDown} onChange={this.props.onChange}/>
                </div>
    }


}


export default NumberInput;