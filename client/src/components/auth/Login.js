import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import { Link } from "react-router-dom";

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
		};
	}

	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	onSubmit = (event) => {
		event.preventDefault();
		//get user data from state
		const userData = {
			email: this.state.email,
			password: this.state.password,
		};
		//log user in with loginUser redux action
		this.props.loginUser(userData);
	};

	componentDidMount() {
		//on component mount, check if user is authernticated,
		//if so, user react-router history.push method to redirect to
		//the dashboard
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}

	componentDidUpdate() {
		//on component update, check if user is authernticated,
		//if so, user react-router history.push method to redirect to
		//the dashboard
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}

	render() {
		const { errors } = this.props;
		return (
			<div className="login form-width m-auto h-100">
				<div className="container bg-light rounded p-4">
					<div className="row">
						<div className="col-12 m-auto">
							<h1 className="display-4 text-center">Log In</h1>
							<p className="lead text-center">
								Sign in to your Complainr account
							</p>
							<p className="lead text-center text-muted">
								Don't have an account? Of course you don't...typical. Whatever,{" "}
								<Link to="/register">sign up here</Link>
							</p>

							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									type="email"
									placeholder={"Email Address"}
									name="email"
									value={this.state.email}
									onChange={this.onChange}
									error={errors.email}
								/>

								<TextFieldGroup
									type="password"
									placeholder={"Password"}
									name="password"
									value={this.state.password}
									onChange={this.onChange}
									error={errors.password}
								/>

								<input
									type="submit"
									className="btn btn-primary rounded-pill btn-block mt-4"
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
