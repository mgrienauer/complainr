import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser } from './actions/authActions'

//custom components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'


//checkfor localstorage for jwt token to see if user is authenticated
//we do this in case a user reloads the page so they dont get logged out
if (localStorage.jwtToken) {
  //set auth token to header for requests
  setAuthToken(localStorage.jwtToken)
  //decode token and get user info 
  const decoded = jwt_decode(localStorage.jwtToken)
  //set user and isAuthenticated in redux state
  store.dispatch(setCurrentUser(decoded))
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
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
