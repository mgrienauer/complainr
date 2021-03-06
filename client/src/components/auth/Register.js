import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import { Link } from "react-router-dom";

class Register extends Component {
	state = {
		name: "",
		email: "",
		password: "",
		password2: "",
		errors: {},
	};

	//check the incoming props from redux state
	//if the incoming props has errors, we will just
	//update component level state with those errors

	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	onSubmit = (event) => {
		event.preventDefault();
		//create new user object to send to backend
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2,
		};

		this.props.registerUser(newUser, this.props.history);
	};

	componentDidMount() {
		//on component mount, check if user is authernticated,
		//if so, user react-router history.push method to redirect to
		//the dashboard
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}

	render() {
		//destructure errors from state for conditional classnames
		const { errors } = this.props;

		return (
			<div className="register login form-width m-auto">
				<div className="container bg-light rounded p-4">
					<div className="row">
						<div className="col-12 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">Create your Complainr account</p>
							<p className="lead text-center text-muted">
								Already have an account? Why are you even here... Whatever,{" "}
								<Link to="/login">log in here</Link>
							</p>
							<form noValidate onSubmit={this.onSubmit}>
								<TextFieldGroup
									type="Name"
									placeholder={"Name"}
									name="name"
									value={this.state.name}
									onChange={this.onChange}
									error={errors.name}
								/>

								<TextFieldGroup
									type="email"
									placeholder={"Email"}
									name="email"
									value={this.stateemaile}
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

								<TextFieldGroup
									type="password"
									placeholder={"Reenter Password"}
									name="password2"
									value={this.state.password2}
									onChange={this.onChange}
									error={errors.password2}
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

//check proptypes to make sure correct values are passed into props
Register.propTypes = {
	registerUser: propTypes.func.isRequired,
	auth: propTypes.object.isRequired,
	errors: propTypes.object.isRequired,
};

//connect the Register component to redux state (auth and errors)
const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(Register);
