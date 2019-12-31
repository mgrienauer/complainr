import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from '../actions/types'

const initState = {
    profile: null,
    profiles: null,
    loading: false
}

export default function(state = initState, action) {
    switch(action.type){
        //return the errors object into redux state
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        //if we get profile data from action, we want to set the profile
        //state to the response from the backend, and set loading to false
        //because we have what we want now
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        //clear the profile state, probably will be on logout
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            }
        default:
            return state
    }
}