import React from 'react';


class LoginInput extends React.Component {

    constructor(){
        super();
        this.state = {
            value: ''
        };

        this.onChange = this.onChange.bind(this);

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

    render(){

        return <input type='text'
                   id='login'
                   name='name'
                   className={this.props.class}
                   placeholder='Логин'
                      value={this.state.value}
                   onChange={this.onChange}
                   onClick={this.props.onClick}
            />


    }


}


export default LoginInput;