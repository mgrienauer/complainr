import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initState = {};

export default function(state = initState, action) {
	switch (action.type) {
		//return the errors object into redux state
		case GET_ERRORS:
			return action.payload;
		case CLEAR_ERRORS:
			return {};
		default:
			return state;
	}
}
