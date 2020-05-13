import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/postActions";
import { Link } from "react-router-dom";

class CommentItem extends Component {
	onDeleteClick(postId, commentId) {
		this.props.deleteComment(postId, commentId);
	}

	render() {
		const { comment, postId, auth } = this.props;
		return (
			<div className="card card-body mb-3">
				<div className="row">
					<div className="col-12 d-flex align-items-center mb-3">
						<Link to={`/profile/handle/${comment.handle}`}>
							<img
								className="rounded-circle d-md-block"
								src={comment.avatar}
								alt="user avatar"
								style={{ height: "50px", width: "50px" }}
							/>
						</Link>
						<div className="d-flex flex-column ml-3 align-items-center justify-content-center text-center">
							<p className="mb-0">{comment.name}</p>
							<Link
								to={`/profile/handle/${comment.handle}`}
								className="link-success"
							>
								{comment.handle}
							</Link>
						</div>
					</div>
					<div className="col-12">
						<p className="lead">{comment.text}</p>

						{comment.user === auth.user.id ? (
							<div className="d-flex w-100 justify-content-end">
								<button
									type="button"
									className="btn btn-danger ml-auto"
									onClick={() => this.onDeleteClick(postId, comment._id)}
								>
									<i className="fas fa-trash" />
								</button>
							</div>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		);
	}
}

CommentItem.propTypes = {
	deleteComment: PropTypes.func.isRequired,
	comment: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
