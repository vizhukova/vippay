import React from 'react';


class LoginInput extends React.Component {

    constructor(){
        super();
        this.state = {
            value: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);

    }

    componentWillReceiveProps(props) {
        if(props.value) {
            this.state.value = props.value;
            this.setState({});
        }
    }

    onChange(e){
        var re = /[a-zA-Z0-9_-]+$/g;
        var value = e.target.value;

        if(re.test(value) || value === ''){
            this.setState({
                value: value
            });

            this.props.onChange({
                target: {
                    value: value,
                    name: 'login'
                }
            })
        }

    }

    onKeyDown(e) {
        if(this.props.notEditable) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            this.props.onKeyDown ? this.props.onKeyDown(e) : '';
        }
    }

    render(){

        return <input type='text'
                   id='login'
                   name='name'
                   className={this.props.class}
                   placeholder='Логин'
                   value={this.state.value}
                   onChange={this.onChange}
                   onClick={this.props.onClick}
                   onKeyDown={this.onKeyDown}
                   tabIndex={this.props.tabIndex}
            />


    }


}


export default LoginInput;