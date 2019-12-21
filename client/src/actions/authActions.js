import axios from 'axios'
import { GET_ERRORS } from './types'


//register a user
export const registerUser = userData => dispatch => {
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