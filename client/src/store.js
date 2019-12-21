import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

//create array of middlewares
const middleware = [thunk]

//create initial state asa empty obj
const initState = {}

const store = createStore(
    rootReducer,
    initState,
    compose(
        applyMiddleware(...middleware),
        //configure redux devtools for chrome
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export default store