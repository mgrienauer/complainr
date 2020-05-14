import React, { Component } from "react";
import PropTypes from "prop-types";

import PostItem from "./PostItem";

class PostFeed extends Component {
	render() {
		const { posts } = this.props;
		if (!this.props.byUser) {
			return posts.map((post) => <PostItem key={post._id} post={post} />);
		} else if (this.props.byUser) {
			let postsByUser = posts.filter((post) => post.user === this.props.byUser);
			return postsByUser.length > 0 ? (
				postsByUser.map((post) => <PostItem key={post._id} post={post} />)
			) : (
				<div>No Posts Found</div>
			);
		}
	}
}

PostFeed.propTypes = {
	posts: PropTypes.array.isRequired,
};

export default PostFeed;
