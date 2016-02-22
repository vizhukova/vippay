import React from 'react';
import _ from 'lodash'


class NumberInput extends React.Component {

    constructor(){
        super();
        this.state = {
            value: 0
        };

        this.onChange = this.onChange.bind(this);
        this.onPaste = this.onPaste.bind(this);
    }

    componentDidMount() {
        this.setState({
            value: this.props.value || this.state.value
        })

        if(this.props.data) document.getElementById(this.props.id).setAttribute(this.props.data.name, this.props.data.value);
    }

    componentWillReceiveProps(props) {
        this.setState({
            value: props.value || this.state.value
        })
        if(this.props.data) document.getElementById(this.props.id).setAttribute(this.props.data.name, this.props.data.value);
    }

    onChange(e) {
        if(e.target.value < 0) return;
        e.target.value = _.trim(e.target.value, 'e-+!@#$%^&*()_/ ');
        this.state.value = e.target.value;
        this.setState({});
        if (this.props.onChange) this.props.onChange(e);
    }

    onPaste(e) {
        /*var oldValue = this.state.value;
        setTimeout(()=>{
            var newValue = _.trim(this.state.value, 'e-+!@#$%^&*()_/ ');

            if(newValue != this.state.value) {this.state.value = newValue; this.setState({});}
        }, 50)*/
    }

    onKeyDown(e) {
        console.log(e.keyCode);
        console.log(e.ctrlKey);
        if(e.keyCode == 107 || e.keyCode == 109 || e.keyCode == 69 || e.keyCode == 189 || e.keyCode == 187)
            e.preventDefault();
    }

    render(){
        //var self = this;
        //return  <div>
        //            <input type="number" id={this.props.id} className="form-control input-lg"
        //                   name={this.props.name}
        //                   value={this.state.value}
        //                   onKeyDown={this.onKeyDown}
        //                   onChange={this.onChange}/>
        //        </div>
        var options = {
            type: 'number',
            id: this.props.id,
            className: "form-control input-lg",
            name: this.props.name,
            value: this.state.value,
            onKeyDown: this.onKeyDown,
            onChange: this.onChange,
            onPaste: this.onPaste
        };

        var propsOptions = _.clone(this.props.options) || {};

        _.assign(options, propsOptions);

        var input = React.createElement('input', options);

        return React.createElement('div', null, input)
    }


}


export default NumberInput;