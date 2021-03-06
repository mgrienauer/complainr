import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getPost } from "../../actions/postActions";

import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

class Post extends Component {
	componentDidMount() {
		this.props.getPost(this.props.match.params.id);
	}

	render() {
		const { post, loading } = this.props.post;
		let postContent;
		if (post === null || loading || Object.keys(post).length === 0) {
			postContent = (
				<div class="spinner-border text-primary text-center" role="status">
					<span class="sr-only">Loading...</span>
				</div>
			);
		} else {
			postContent = (
				<div>
					<PostItem post={post} showActions={false} />
					<CommentForm postId={post._id} />
					<CommentFeed postId={post._id} comments={post.comments} />
				</div>
			);
		}

		return (
			<div className="post">
				<div className="container" style={{ maxWidth: "700px" }}>
					<div className="row">
						<div className="col-12">
							<Link
								to="/feed"
								className="btn btn-outline-secondary btn-rounded-pill mb-3"
							>
								Back to Feed
							</Link>
						</div>
						<div className="col-12">{postContent}</div>
					</div>
				</div>
			</div>
		);
	}
}

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
