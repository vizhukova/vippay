import React from 'react'


class Register extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        return <div>
            <div className="row">
				<div className="col-xs-6 col-sm-6 col-md-6">
					<div className="form-group">
                        <input type="text" name="first_name" id="first_name" className="form-control input-lg" placeholder="First Name" tabIndex="1" />
					</div>
				</div>
				<div className="col-xs-6 col-sm-6 col-md-6">
					<div className="form-group">
						<input type="text" name="last_name" id="last_name" className="form-control input-lg" placeholder="Last Name" tabIndex="2" />
					</div>
				</div>
			</div>
			<div className="form-group">
				<input type="text" name="display_name" id="display_name" className="form-control input-lg" placeholder="Display Name" tabIndex="3" />
			</div>
			<div className="form-group">
				<input type="email" name="email" id="email" className="form-control input-lg" placeholder="Email Address" tabIndex="4" />
			</div>
			<div className="row">
				<div className="col-xs-6 col-sm-6 col-md-6">
					<div className="form-group">
						<input type="password" name="password" id="password" className="form-control input-lg" placeholder="Password" tabIndex="5" />
					</div>
				</div>
				<div className="col-xs-6 col-sm-6 col-md-6">
					<div className="form-group">
						<input type="password" name="password_confirmation" id="password_confirmation" className="form-control input-lg" placeholder="Confirm Password" tabIndex="6" />
					</div>
				</div>
			</div>
            </div>
    }
}

export default Register;