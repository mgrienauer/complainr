import axios from 'axios'

import { ADD_POST, GET_POSTS, POST_LOADING, GET_ERRORS } from './types'

//Add a single post
export const addPost = postData => dispatch => {
    //make post request to our api/posts endpoint with postData
    axios.post('./api/posts', postData)
        //dispatch ADD_POST to reducer using the data returned from api
        .then(res => {
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
        })
        //check for errors
        .catch(error => {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
            })
        })
}

//get posts
export const getPosts = () => dispatch => {
    //set post loading state to true while fetching data
    dispatch(setPostLoading())
    //make post request to our api/posts endpoint with postData
    axios.get('./api/posts')
        //dispatch GET_POSTS to reducer using the data returned from api
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        })
        //catch errors and set payload to null
        .catch(error => {
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        })
}

//set posts loading state
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
}