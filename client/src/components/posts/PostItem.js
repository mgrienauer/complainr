import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletePost, likePost, dislikePost, unLikePost, unDislikePost } from '../../actions/postActions'

class PostItem extends Component {
	onDeleteClick = (postId) => {
		this.props.deletePost(postId)
	}

	onLikeBtnClick = (postId) => {
		//get user id and likes array from post object
		const { id } = this.props.auth.user
		const likes = this.props.post.likes.map(like => like.user)

		//if user hasn't already liked a post, dispatch likePost
		if (!likes.includes(id)) {
			this.props.likePost(postId)
		//else, if user HAS liked post, dispatch unlikePost
		} else {
			this.props.unLikePost(postId)
		}
	}

	onDislikeBtnClick = (postId) => {
		//get user id and dislikes array from post object
		const { id } = this.props.auth.user
		const dislikes = this.props.post.dislikes.map(dislike => dislike.user)

		//if user hasn't already liked a post, dispatch likePost
		if (!dislikes.includes(id)) {
			this.props.dislikePost(postId)
		//else, if user HAS liked post, dispatch unlikePost
		} else {
			this.props.unDislikePost(postId)
		}
	}

	userHasLiked = () => {
		//get user id and likes array from post object
		const { id } = this.props.auth.user
		const likes = this.props.post.likes.map(like => like.user)

		if (likes.includes(id)) {
			return true
		} else {
			return false
		}
	}

	userHasDisliked = () => {
		//get user id and dislikes array from post object
		const { id } = this.props.auth.user
		const dislikes = this.props.post.dislikes.map(dislike => dislike.user)

		if (dislikes.includes(id)) {
			return true
		} else {
			return false
		}
	}

	

	render() {
			const { post, auth } = this.props
			return (
					<div className="card card-body mb-3">
						<div className="row">
							<div className="col-md-2">
								<a href="profile.html">
									<img 
										className="rounded-circle d-none d-md-block"
										src={post.avatar}
										alt="User's profile picture" 
										style={{ height: '50px', width: '50px' }}
									/>
								</a>
								<br />
								<p className="text-center">{post.name}</p>
							</div>
							<div className="col-md-10">
								<p className="lead">{post.text}</p>
								<button type="button" className="btn btn-light mr-1" onClick={() => this.onLikeBtnClick(post._id)}>
									<i className={`${this.userHasLiked() ? 'text-info' : 'text-secondary'} fas fa-thumbs-up`}></i>
									<span className="badge badge-light">{post.likes.length}</span>
								</button>
								<button type="button" className="btn btn-light mr-1" onClick={() => this.onDislikeBtnClick(post._id)}>
									<i className={`${this.userHasDisliked() ? 'text-info' : 'text-secondary'} fas fa-thumbs-down`}></i>
									<span className="badge badge-light">{post.dislikes.length}</span>
								</button>
								<Link to={`/posts/${post._id}`} className="btn btn-info mr-1">
									Comments
								</Link>
								{post.user === auth.user.id
									? <button 
											type="button" 
											className="btn btn-danger mr-1"
											onClick={() => this.onDeleteClick(post._id)}
											>
											<i className="fas fa-times" />
										</button> 
									: ''
								}
							</div>
						</div>
					</div>
			)
	}
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
		auth: PropTypes.object.isRequired,
		deletePost: PropTypes.func.isRequired,
		likePost: PropTypes.func.isRequired,
		dislikePost: PropTypes.func.isRequired, 
		unLikePost: PropTypes.func.isRequired,
		unDislikePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deletePost, likePost, dislikePost, unLikePost, unDislikePost })(PostItem)