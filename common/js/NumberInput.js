import React from 'react';


class NumberInput extends React.Component {

    constructor(){
        super();
        this.state = {};
    }

    componentDidMount(){

    }

    onKeyDown(e) {
        console.log(e.keyCode)
        if(e.keyCode == 107 || e.keyCode == 109 || e.keyCode == 69 || e.keyCode == 189 || e.keyCode == 187)
            e.preventDefault();
    }

    render(){
        var self = this;
        return  <div>
                    <input type="number" id={this.props.id} className="form-control input-lg" name={this.props.name} value={this.props.value} onKeyDown={this.onKeyDown} onChange={this.props.onChange}/>
                </div>
    }


}


export default NumberInput;