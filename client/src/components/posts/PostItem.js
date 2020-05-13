import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
	deletePost,
	likePost,
	dislikePost,
	unLikePost,
	unDislikePost,
} from "../../actions/postActions";

class PostItem extends Component {
	onDeleteClick = (postId) => {
		this.props.deletePost(postId);
	};

	onLikeBtnClick = (postId) => {
		//get user id and likes array from post object
		const { id } = this.props.auth.user;
		const likes = this.props.post.likes.map((like) => like.user);

		//if user hasn't already liked a post, dispatch likePost
		if (!likes.includes(id)) {
			this.props.likePost(postId);
			//else, if user HAS liked post, dispatch unlikePost
		} else {
			this.props.unLikePost(postId);
		}
	};

	onDislikeBtnClick = (postId) => {
		//get user id and dislikes array from post object
		const { id } = this.props.auth.user;
		const dislikes = this.props.post.dislikes.map((dislike) => dislike.user);

		//if user hasn't already liked a post, dispatch likePost
		if (!dislikes.includes(id)) {
			this.props.dislikePost(postId);
			//else, if user HAS liked post, dispatch unlikePost
		} else {
			this.props.unDislikePost(postId);
		}
	};

	userHasLiked = () => {
		//get user id and likes array from post object
		const { id } = this.props.auth.user;
		const likes = this.props.post.likes.map((like) => like.user);

		if (likes.includes(id)) {
			return true;
		} else {
			return false;
		}
	};

	userHasDisliked = () => {
		//get user id and dislikes array from post object
		const { id } = this.props.auth.user;
		const dislikes = this.props.post.dislikes.map((dislike) => dislike.user);

		if (dislikes.includes(id)) {
			return true;
		} else {
			return false;
		}
	};

	render() {
		const { post, auth, showActions } = this.props;
		let complaintValidity = post.likes.length - post.dislikes.length;
		return (
			<div className="card card-body mb-3 container">
				<div className="row d-flex h-100">
					<div className="col-2 d-flex flex-column justify-content-between align-items-center h-100 my-auto ">
						<button
							type="button"
							className="btn btn-light mt-2 mb-1 p-0 p-md-2"
							onClick={() => this.onLikeBtnClick(post._id)}
						>
							<div className="d-flex flex-column">
								<i
									className={`${
										this.userHasLiked() ? "text-info" : "text-secondary"
									} fas fa-arrow-up fa-lg mt-1 mb-1`}
								></i>
								<h3>😨</h3>
							</div>
							<span className="font-weight-bold">OOF</span>
						</button>
						<button
							type="button"
							className="btn btn-light mt-1 mb-1 p-0 p-md-2"
							onClick={() => this.onDislikeBtnClick(post._id)}
						>
							<span className="font-weight-bold">MEH</span>
							<div className="d-flex flex-column">
								<h3>😒</h3>
								<i
									className={`${
										this.userHasDisliked() ? "text-info" : "text-secondary"
									} fas fa-arrow-down fa-lg mb-1 mt-1`}
								></i>
							</div>
						</button>
					</div>

					<div className="col-10 d-flex flex-column w-100">
						<div className="d-flex flex-wrap align-items-center mb-3">
							<Link to={`/profile/handle/${post.handle}`}>
								<img
									className="rounded-circle"
									src={post.avatar}
									alt="User's profile picture"
									style={{ height: "50px", width: "50px" }}
								/>
							</Link>
							<div className="d-flex flex-column ml-3 align-items-center justify-content-center text-center">
								<p className="p-0 mb-0">{post.name}</p>
								<Link
									to={`/profile/handle/${post.handle}`}
									className="link-success"
								>
									{post.handle}
								</Link>
							</div>
							<h5 className="ml-2 mt-2 ml-sm-auto">
								Complaint Validity: {complaintValidity}
							</h5>
						</div>

						<p className="lead">{post.text}</p>

						<div className="d-flex flex-row w-100 mt-auto">
							{showActions && (
								<Link to={`/post/${post._id}`} className="btn btn-info">
									Comments · {post.comments.length}
								</Link>
							)}

							{post.user === auth.user.id ? (
								<button
									type="button"
									className="btn btn-danger ml-auto"
									onClick={() => this.onDeleteClick(post._id)}
								>
									<i className="fas fa-trash" />
								</button>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

PostItem.defaultProps = { showActions: true };

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deletePost: PropTypes.func.isRequired,
	likePost: PropTypes.func.isRequired,
	dislikePost: PropTypes.func.isRequired,
	unLikePost: PropTypes.func.isRequired,
	unDislikePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {
	deletePost,
	likePost,
	dislikePost,
	unLikePost,
	unDislikePost,
})(PostItem);
