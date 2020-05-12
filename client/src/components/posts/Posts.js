import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";

import PostForm from "./PostForm";
import PostFeed from "./PostFeed";

class Posts extends Component {
	componentDidMount() {
		this.props.getPosts();
	}

	render() {
		const { posts, loading } = this.props.post;
		const { isAuthenticated } = this.props.auth;

		let postContent;

		if (posts === null || loading) {
			postContent = (
				<div className="mx-auto" style={{ width: "50px" }}>
					<div className="spinner-border text-primary" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			);
		} else {
			postContent = <PostFeed posts={posts} />;
		}

		return (
			<div className="feed">
				<div className="container" style={{ maxWidth: "700px" }}>
					<div className="row">
						<div className="col-md-12">
							{isAuthenticated ? <PostForm /> : null}
							{postContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	posts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
	auth: state.auth,
});

export default connect(mapStateToProps, { getPosts })(Posts);
