import axios from "axios";

import {
	ADD_POST,
	GET_POSTS,
	GET_POST,
	POST_LOADING,
	GET_ERRORS,
	DELETE_POST,
	CLEAR_ERRORS,
} from "./types";

//Add a single post
export const addPost = postData => dispatch => {
	//clear all errors
	dispatch(clearErrors());
	//make post request to our api/posts endpoint with postData
	axios
		.post("/api/posts", postData)
		//dispatch ADD_POST to reducer using the data returned from api
		.then(res => {
			dispatch({
				type: ADD_POST,
				payload: res.data,
			});
		})
		//check for errors
		.catch(error => {
			dispatch({
				type: GET_ERRORS,
				payload: error.response.data,
			});
		});
};

//get posts
export const getPosts = () => dispatch => {
	//set post loading state to true while fetching data
	dispatch(setPostLoading());
	//make post request to our api/posts endpoint with postData
	axios
		.get("/api/posts")
		//dispatch GET_POSTS to reducer using the data returned from api
		.then(res => {
			dispatch({
				type: GET_POSTS,
				payload: res.data,
			});
		})
		//catch errors and set payload to null
		.catch(error => {
			dispatch({
				type: GET_POSTS,
				payload: null,
			});
		});
};

//get single post
export const getPost = postId => dispatch => {
	//set post loading state to true while fetching data
	dispatch(setPostLoading());
	//make post request to our api/posts endpoint with postData
	axios
		.get(`/api/posts/${postId}`)
		//dispatch GET_POSTS to reducer using the data returned from api
		.then(res => {
			dispatch({
				type: GET_POST,
				payload: res.data,
			});
		})
		//catch errors and set payload to null
		.catch(error => {
			dispatch({
				type: GET_POST,
				payload: null,
			});
		});
};

//delete a post
export const deletePost = id => dispatch => {
	//make delete request to our api/posts/:id endpoint with postData
	axios
		.delete(`/api/posts/${id}`)
		//dispatch GET_POSTS to reducer using the data returned from api
		.then(res => {
			dispatch({
				type: DELETE_POST,
				payload: id,
			});
		})
		//catch errors and dispatch GET_ERRORS if error
		.catch(error => {
			dispatch({
				type: GET_ERRORS,
				payload: error.response.data,
			});
		});
};

//add a like to a post
export const likePost = id => dispatch => {
	//make post request to our api/posts/like/:id endpoint to add a like
	axios
		.post(`/api/posts/like/${id}`)
		//dispatch getPosts() to get updated post info
		.then(res => dispatch(getPosts()))
		//catch errors and dispatch GET_ERRORS if error
		.catch(error => {
			dispatch({
				type: GET_ERRORS,
				payload: error.response.data,
			});
		});
};

//add a dislike to a post
export const dislikePost = id => dispatch => {
	//make post request to our api/posts/dislike/:id endpoint to add a dislike
	axios
		.post(`/api/posts/dislike/${id}`)
		//dispatch getPosts() to get updated post info
		.then(res => dispatch(getPosts()))
		//catch errors and dispatch GET_ERRORS if error
		.catch(error => {
			dispatch({
				type: GET_ERRORS,
				payload: error.response.data,
			});
		});
};

//add a dislike to a post
export const unLikePost = id => dispatch => {
	//make post request to our api/posts/dislike/:id endpoint to add a dislike
	axios
		.post(`/api/posts/unlike/${id}`)
		//dispatch getPosts() to get updated post info
		.then(res => dispatch(getPosts()))
		//catch errors and dispatch GET_ERRORS if error
		.catch(error => {
			dispatch({
				type: GET_ERRORS,
				payload: error.response.data,
			});
		});
};

//add a dislike to a post
export const unDislikePost = id => dispatch => {
	//make post request to our api/posts/dislike/:id endpoint to add a dislike
	axios
		.post(`/api/posts/undislike/${id}`)
		//dispatch getPosts() to get updated post info
		.then(res => dispatch(getPosts()))
		//catch errors and dispatch GET_ERRORS if error
		.catch(error => {
			dispatch({
				type: GET_ERRORS,
				payload: error.response.data,
			});
		});
};

//Add a comment to a post
export const addComment = (postId, commentData) => dispatch => {
	//clear all errors
	dispatch(clearErrors());
	//make post request to our api/posts endpoint with postData
	axios
		.post(`/api/posts/comment/${postId}`, commentData)
		//dispatch ADD_POST to reducer using the data returned from api
		.then(res => {
			dispatch({
				type: GET_POST,
				payload: res.data,
			});
		})
		//check for errors
		.catch(error => {
			dispatch({
				type: GET_ERRORS,
				payload: error.response.data,
			});
		});
};

//delete a comment
export const deleteComment = (postId, commentId) => dispatch => {
	//make delete request to our api/posts/:id endpoint with postData
	axios
		.delete(`/api/posts/comment/${postId}/${commentId}`)
		//dispatch GET_POSTS to reducer using the data returned from api
		.then(res => {
			dispatch({
				type: GET_POST,
				payload: res.data,
			});
		})
		//catch errors and dispatch GET_ERRORS if error
		.catch(error => {
			dispatch({
				type: GET_ERRORS,
				payload: error.response.data,
			});
		});
};

//set posts loading state
export const setPostLoading = () => {
	return {
		type: POST_LOADING,
	};
};

// Clear errors
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS,
	};
};
