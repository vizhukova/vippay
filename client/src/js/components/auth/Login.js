import React from 'react'


class Login extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        return <div>
            <div className="row">
			<div className="form-group">
				<input type="text" name="email" id="email" className="form-control input-lg" placeholder="Электронная почта" tabIndex="1" />
			</div>
            <div className="form-group">
				<input type="text" name="password" id="password" className="form-control input-lg" placeholder="Пароль" tabIndex="2" />
			</div>
            </div>
            <div className="btn btn-primary btn-block">Отправить</div>
            </div>

    }
}

export default Login;