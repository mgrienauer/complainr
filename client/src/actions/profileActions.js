import axios from 'axios'

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS } from './types'

//get current profile
export const getCurrentProfile = () => dispatch => {
    //set profile state to loading until we get data back from server
    dispatch(setProfileLoading())
    //get profile data from backend
    axios.get('/api/profile')
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        //we still dispatch GET_PROFILE because a user may have registered
        //and not set up a profile yet. in that case it will return an empty object
        .catch(err => {
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        })
}

//profile loading function
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}