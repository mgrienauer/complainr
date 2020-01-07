import axios from 'axios'

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE } from './types'

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

//create a profile
export const createProfile = (profileData, history) => dispatch => {
    //make a post request to profile endpoint with profileData
    //the backend will handle storing on DB and validation
    axios.post('/api/profile', profileData)
        //redirect user to dashboard if success
        .then(res => history.push('/dashboard'))
        //dispatch GET_ERRORS to reducers if error
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

//profile loading function
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

//clear profile (probably on logout)
export const clearCurrentProfile= () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}