import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addComment } from "../../actions/postActions";

class CommentForm extends Component {
	state = {
		text: "",
		errors: this.props.errors ? this.props.errors : {},
	};

	onSubmit = event => {
		event.preventDefault();
		//get user from props.auth
		const { user } = this.props.auth;
		const { postId } = this.props;
		//create a newPost object with data to send to backend
		const newComment = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar,
		};
		//fire off addPost action with the newPost data
		this.props.addComment(postId, newComment);
		//reset text to blank
		this.setState({ text: "" });
	};

	onChange = event => {
		const { value, name } = event.target;
		//set errors for the field to blank if user begins typing again
		this.setState(prevState => ({
			errors: { ...prevState.errors, [name]: "" },
			[name]: value,
		}));
	};

	componentDidUpdate(prevState) {
		if (prevState.errors !== this.props.errors) {
			this.setState({ errors: this.props.errors });
		}
	}

	render() {
		const { errors } = this.state;

		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">
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
							<button type="submit" className="btn btn-dark">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

CommentForm.propTypes = {
	addPost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { addComment })(CommentForm);
