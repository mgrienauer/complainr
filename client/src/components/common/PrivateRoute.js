import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

//Good example of how privateRoute works in react here: https://tylermcginnis.com/react-router-protected-routes-authentication/

//destructute component and rename as Component, get auth and the rest
//of props for access
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        //pass props from PrivateRoute into this Route
        {...rest}
        //decide, based on props, what will get rendered
        render = {props => 
            auth.isAuthenticated 
                //if user is authenticated, render component
                ? (<Component {...props} />) 
                //else, redirect to login
                : (<Redirect to="/login" />)
        }
    /> 
)


PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

//since route is private, we need redux auth state to
//make sure user is authorized to access route
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)