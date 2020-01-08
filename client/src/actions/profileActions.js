import axios from 'axios'

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, DELETE_ACCOUNT, SET_CURRENT_USER, GET_ERRORS } from './types'

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

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
    axios
      .post('/api/profile', profileData)
      .then(res => history.push('/dashboard'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
}

//delete account and profile
export const deleteAccount = () => dispatch => {
    //after confirmation popup is clicked, delete profile
    if (window.confirm("Are you sure you want to delete your account you big crybaby? This can't be undone")) {
        //delete request to backend
        axios.delete('/api/profile')
        //use succesful response to set current user to empty object
        .then(res => {
            dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
    }
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