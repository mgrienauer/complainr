import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { clearCurrentProfile } from './actions/profileActions'

//custom components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/dashboard/Dashboard'


//checkfor localstorage for jwt token to see if user is authenticated
//we do this in case a user reloads the page so they dont get logged out
if (localStorage.jwtToken) {
  //set auth token to header for requests
  setAuthToken(localStorage.jwtToken)
  //decode token and get user info 
  const decoded = jwt_decode(localStorage.jwtToken)
  //set user and isAuthenticated in redux state
  store.dispatch(setCurrentUser(decoded))

  //check for expired jwt token and log user out if expired
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    //log user out
    store.dispatch(logoutUser())
    //clear user profile state
    store.dispatch(clearCurrentProfile())
    //Redirect to login page
    window.location.href='/login'
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={ Landing } />
          <div className="container">
            <Route exact path="/register" component={ Register } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/dashboard" component={ Dashboard } />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
