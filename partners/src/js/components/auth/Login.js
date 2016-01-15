import React from 'react'
import ApiActions from './../../actions/ApiActions'


class Login extends React.Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.login = this.login.bind(this);
        this.state = {errors: {}};
    }

    onChange(e){
        var state = {};
        console.log(e.target.name)
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    componentDidMount() {
		var id = location.hash.slice(location.hash.lastIndexOf('/') + 1, location.hash.lastIndexOf('?'));
		this.setState({client_id: id});
	}

    login() {
        var self = this;
        if(!this.isCorrectField()) {
            this.setState({});
            return;
        }

        ApiActions.post('partner/login', this.state)
            .then(function(data){
                console.log('Token: ' + data.token);
                localStorage.setItem('token', data.token);
                location.hash = '';
            })
            .catch(function(err){
                console.log('error');
                if(!err.message) return;
                console.log(JSON.parse(err.message));
                self.setState({errors: JSON.parse(err.message)})
            })
    }

    isCorrectField() {
        var empty = false;

        if(!this.state.email || this.state.email.length == 0) {this.state.errors.email = ["Поле 'электронная почта' должно быть заполнено"]; empty = true;}
        if(!this.state.password || this.state.password.length == 0) {this.state.errors.password = ["Поле 'пароль' должно быть заполнено"]; empty = true;}

        if( empty ) {
            //alert('Все поля должны быть заполнены');
            return false;
        }

        return true;
    }


    render() {
        var baseClass = "form-control input-lg";

        return <div>
            <div className="row">
			<div className="form-group">
				<input type="text" name="email" id="email" className={this.state.errors.email ? `${baseClass} invalid` : baseClass} onChange={this.onChange} placeholder="Электронная почта" tabIndex="1" />
			</div>
            <div className="form-group">
				<input type="password" name="password" id="password" className={this.state.errors.password ? `${baseClass} invalid` : baseClass} onChange={this.onChange} placeholder="Пароль" tabIndex="2" />
			</div>
            </div>
            <div className="btn btn-primary btn-block" onClick={this.login}>Отправить</div>
            </div>

    }
}

export default Login;