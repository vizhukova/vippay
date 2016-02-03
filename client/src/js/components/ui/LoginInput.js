import React from 'react';


class LoginInput extends React.Component {

    constructor(){
        super();
        this.state = {
            showPassword: false
        };
        this.changePasswordVisible = this.changePasswordVisible.bind(this);

    }

    changePasswordVisible(){

        this.setState({
            showPassword: !this.state.showPassword
        })

    }

    render(){

        return <input type='text'
                   id='login'
                   name='name'
                   className={this.props.class}
                   placeholder={this.props.placeholder}
                   onChange={this.props.onChange}
            />


    }


}


export default LoginInput;