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
				<input type="text" name="email" id="email" className="form-control input-lg" placeholder="Email Address" tabIndex="1" />
			</div>
            <div className="form-group">
				<input type="text" name="password" id="password" className="form-control input-lg" placeholder="Password" tabIndex="2" />
			</div>
            </div>
            </div>

    }
}

export default Login;