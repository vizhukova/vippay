import React from 'react';
import _ from 'lodash'


class NumberInput extends React.Component {

    constructor(){
        super();
        this.state = {
            value: null,
            timeoutId: null
        };

        this.onChange = this.onChange.bind(this);
        this.checkValue = this.checkValue.bind(this);
    }

    componentDidMount() {
        this.setState({
            value: this.props.value || this.state.value,
            toFixed: this.props.toFixed || 0
        })
    }

    componentWillReceiveProps(props) {
        this.setState({
            value: props.value || this.state.value,
            toFixed: this.props.toFixed || 0
        })
    }

    checkValue(e) {
        var val = this.state.value;
        val = val.replace(/[^0-9.,]/g,'')
                .replace(',', '.')
                .split('.')
                .filter((item) => item.length);
        debugger
        if(val.length) {
            val = val.length > 1 ? `${val[0]}.${val[1].slice(0, 2)}` : val[0];
        } else {
            val = 0;
        }

        val = parseFloat(val).toFixed(this.state.toFixed);

        var e = {target:{name: this.props.name, value: null}};

        e.target.value = val;
       this.props.onChange(e);
    }

    onChange(e) {

        if(this.state.timeoutId) clearTimeout(this.state.timeoutId);

        this.state.value = e.target.value;
        this.setState({});

        this.state.timeoutId = setTimeout(() => {
           this.checkValue(e);
        }, 1000);

    }


    render(){

        var options = {
            type: 'text',
            id: this.props.id,
            className: this.props.className,
            placeholder: this.props.placeholder,
            name: this.props.name,
            value: this.state.value,
            //onKeyDown: this.onKeyDown,
            onChange: this.onChange
        };

        var propsOptions = _.clone(this.props.options) || {};

        _.assign(options, propsOptions);

        var input = React.createElement('input', options);

        return React.createElement('div', null, input)
    }


}


export default NumberInput;