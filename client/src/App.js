import React from "react";
import "./App.css";
import "bootswatch/dist/flatly/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

//custom components
import PrivateRoute from "./components/common/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import Profile from "./components/profile/Profile";
import PostsByUser from "./components/posts/PostsByUser";

//checkfor localstorage for jwt token to see if user is authenticated
//we do this in case a user reloads the page so they dont get logged out
if (localStorage.jwtToken) {
	//set auth token to header for requests
	setAuthToken(localStorage.jwtToken);
	//decode token and get user info
	const decoded = jwt_decode(localStorage.jwtToken);
	//set user and isAuthenticated in redux state
	store.dispatch(setCurrentUser(decoded));

	//check for expired jwt token and log user out if expired
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		//log user out
		store.dispatch(logoutUser());
		//clear user profile state
		store.dispatch(clearCurrentProfile());
		//Redirect to login page
		window.location.href = "/login";
	}
}

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<Navbar />
					<Route exact path="/" component={Landing} />

					<div className="container">
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/feed" component={Posts} />
						<Route exact path="/profile/handle/:handle" component={Profile} />
						<Route exact path="/posts/byUser/:handle" component={PostsByUser} />
						<Switch>
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
						</Switch>
						<Switch>
							<PrivateRoute
								exact
								path="/create-profile"
								component={CreateProfile}
							/>
						</Switch>
						<Switch>
							<PrivateRoute
								exact
								path="/edit-profile"
								component={EditProfile}
							/>
						</Switch>

						<Switch>
							<PrivateRoute exact path="/post/:id" component={Post} />
						</Switch>
					</div>
					<Footer />
				</div>
			</Router>
		</Provider>
	);
}

export default App;
