import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import { GET_ERRORS, SET_CURRENT_USER } from './types'


//register a user
export const registerUser = (userData, history) => dispatch => {
    //use axios to make post request to '/api/users/register on our backend using the newUser object
    axios.post('/api/users/register', userData)
        //on succes, redirect to login page
        .then(res => console.log(res.data))
        //since response is async, we need to manually use
        //dispatch to fire off action 
        .catch(err => {
            console.log(err.response.data)
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })

}

//login a user and get JWT tokenwe will save the token in local storage so that
//a user can stay logged in as long as the window is open in browser. we will destroy the local storage
//token on logout 
export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            //get the token from response obbject
            const { token } = res.data
            //set token in localstorage (token will be a string already)
            localStorage.setItem('jwtToken', token)
            //set auth token in the request header
            setAuthToken(token)
            //decode token to get user data
            const decoded = jwt_decode(token)
            //dispatch SetCurrentUser action to set the user data in redux state
            dispatch(setCurrentUser(decoded))
        })
        .catch(err => {
            //log errors to console and dispatch GET_ERRORS action if error
            console.log(err.response.data)
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

//Set logged in user with the decoded token data
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}