import axios from "axios"

//we will set the default header that will be 
//included in axios requests with this function
//docs: https://github.com/axios/axios  ctrl+f 'global axios defaults'

const setAuthToken = token => {
    if (token) {
        //if token exists, apply it as the Authorization header for each request
        axios.defaults.headers.common['Authorization'] = token
    } else {
        //no token? then delete the previous token from the auth header
        delete axios.defaults.headers.common['Authorization']
    }
}

export default setAuthToken