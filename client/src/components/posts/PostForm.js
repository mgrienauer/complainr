import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../actions/postActions";

class PostForm extends Component {
	state = {
		text: "",
		remainingChars: 140,
		errors: this.props.errors ? this.props.errors : {},
	};

	onSubmit = (event) => {
		event.preventDefault();
		//get user from props.auth
		const { user } = this.props.auth;
		//create a newPost object with data to send to backend
		const newPost = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar,
		};
		//fire off addPost action with the newPost data
		this.props.addPost(newPost);
		//reset text to blank
		this.setState({ text: "" });
	};

	onChange = (event) => {
		const { value, name } = event.target;

		const charCount = value.length;
		const remainingChars = 140 - charCount;

		this.setState((prevState) => ({
			errors: { ...prevState.errors, [name]: "" },
			[name]: value,
			remainingChars,
		}));
	};

	componentDidUpdate(prevState) {
		if (prevState.errors !== this.props.errors) {
			this.setState({ errors: this.props.errors });
		}
	}

	renderRemainingChars = () => {
		const { remainingChars } = this.state;

		let content;
		if (remainingChars > 0) {
			content = <span className="text-muted">{remainingChars} / 140</span>;
		} else if (remainingChars <= 0) {
			content = <span className="text-danger">0 / 140</span>;
		}
		return content;
	};

	render() {
		const { errors } = this.state;

		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-success text-white">
						Complain about something. We can <strong>hardly</strong> wait...
					</div>
					<div className="card-body">
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<TextAreaFieldGroup
									placeholder="Make your lame ass complaint here..."
									name="text"
									value={this.state.text}
									onChange={this.onChange}
									error={errors.text}
								/>
							</div>
							<div className="d-flex w-100 text-center align-items-center">
								<button
									type="submit"
									className="btn btn-success"
									disabled={
										!this.state.text.length || this.state.text.length > 140
									}
								>
									Submit
								</button>
								<p className="ml-auto">{this.renderRemainingChars()}</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { addPost })(PostForm);
