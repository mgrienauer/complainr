import { SET_CURRENT_USER } from '../actions/types'
import isEmpty from '../validation/is-empty'

const initState = {
    isAuthenticated: false,
    user: {},
}

export default function(state = initState, action) {
    switch(action.type){
        case SET_CURRENT_USER:
            //if the action payload is NOT empty (meaning authentication was a success)
            //set isAuthenticated to true
            return{
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state
    }
}