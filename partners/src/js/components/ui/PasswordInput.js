import React from 'react';


class PasswordInput extends React.Component {

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

        var eyeClass = this.state.showPassword ? 'glyphicon-eye-open' : 'glyphicon-eye-close'

        return  <div className="form-group password-field">
            <input type={this.state.showPassword ? 'text' : 'password'}
                   id={this.props.id}
                   name={this.props.name}
                   className={this.props.class}
                   placeholder={this.props.placeholder}
                   onChange={this.props.onChange}
            />
            <i className={`password-eye glyphicon ${eyeClass}`} onClick={this.changePasswordVisible}></i>
        </div>
    }


}


export default PasswordInput;