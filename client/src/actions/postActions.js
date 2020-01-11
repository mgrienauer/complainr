import axios from 'axios'

import { ADD_POST, GET_ERRORS } from './types'

//Add post
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