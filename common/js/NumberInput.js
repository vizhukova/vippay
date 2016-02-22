import React from 'react';


class NumberInput extends React.Component {

    constructor(){
        super();
        this.state = {
            value: 0
        };

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            value: this.props.value || this.state.value
        })
    }

    componentWillReceiveProps(props) {
        this.setState({
            value: props.value || this.state.value
        })
    }

    onChange(e) {
        if(e.target.value < 0) return;
        this.state.value = e.target.value;
        this.setState({});
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