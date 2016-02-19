import React from 'react';


class NumberInput extends React.Component {

    constructor(){
        super();
        this.state = {};

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            value: this.props.value || 0
        })
    }

    onChange(e) {
        if(e.target.value < 0) return;
        this.setState({value: e.target.value});
        if (this.props.onChange) this.props.onChange(e);
    }

    onKeyDown(e) {
        console.log(e.keyCode);
        if(e.keyCode == 107 || e.keyCode == 109 || e.keyCode == 69 || e.keyCode == 189 || e.keyCode == 187)
            e.preventDefault();
    }

    render(){
        var self = this;
        return  <div>
                    <input type="number" id={this.props.id} className="form-control input-lg" name={this.props.name} value={this.state.value} onKeyDown={this.onKeyDown} onChange={this.onChange}/>
                </div>
    }


}


export default NumberInput;