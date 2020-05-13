import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addComment } from "../../actions/postActions";
import { getCurrentProfile } from "../../actions/profileActions";

class CommentForm extends Component {
	state = {
		text: "",
		errors: this.props.errors ? this.props.errors : {},
		remainingChars: 140,
	};

	//once component mounts, fetch profile data from backend
	componentDidMount() {
		this.props.getCurrentProfile();
	}

	onSubmit = (event) => {
		event.preventDefault();
		//get user from props.auth
		const { user } = this.props.auth;
		const { postId } = this.props;
		//get current profile
		const { handle } = this.props.profile.profile;
		//create a newPost object with data to send to backend
		const newComment = {
			text: this.state.text,
			handle,
			name: user.name,
			avatar: user.avatar,
		};
		//fire off addPost action with the newPost data
		this.props.addComment(postId, newComment);
		//reset text to blank
		this.setState({ text: "" });
	};

	onChange = (event) => {
		const { value, name } = event.target;

		const charCount = value.length;
		const remainingChars = 140 - charCount;
		//set errors for the field to blank if user begins typing again
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
						Make a comment. We're on the edge of our seat...
					</div>
					<div className="card-body">
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<TextAreaFieldGroup
									placeholder="Make your witty reply..."
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

CommentForm.propTypes = {
	addPost: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
	profile: state.profile,
});

export default connect(mapStateToProps, { addComment, getCurrentProfile })(
	CommentForm,
);
