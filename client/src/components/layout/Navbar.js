import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {
	onLogoutClick = (event) => {
		event.preventDefault();
		//clear jwt token and clear user redux state
		this.props.logoutUser();
		//clear profile data in redux state
		this.props.clearCurrentProfile();
		//redirect to login page
		this.props.history.push("/login");
	};

	render() {
		const { isAuthenticated, user } = this.props.auth;

		const authLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/feed">
						Feed
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/dashboard">
						Dashboard
					</Link>
				</li>
				<li className="nav-item">
					<a href="#" className="nav-link" onClick={this.onLogoutClick}>
						<img
							src={user.avatar}
							alt={user.name}
							title="Must have gravatar linked to email for profile img"
							style={{ width: "25px", marginRight: "7px", borderRadius: "50%" }}
						/>
						Logout
					</a>
				</li>
			</ul>
		);

		const guestLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/feed">
						Feed
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/register">
						Sign Up
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/login">
						Login
					</Link>
				</li>
			</ul>
		);

		return (
			<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
				<div className="container">
					<Link className="navbar-brand" to="/">
						Complainr
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#mobile-nav"
					>
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="mobile-nav">
						{isAuthenticated ? authLinks : guestLinks}
					</div>
				</div>
			</nav>
		);
	}
}

//define what prop types should be required by Navbar component
Navbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

//get auth state from redux store
const mapStateToProps = (state) => ({
	auth: state.auth,
});

//we are using compose and withRouter because Navbar isnt rendered inside of
//Route component, but we need the props that Route provides so that
//we can redirect on logout
export default compose(
	withRouter,
	connect(mapStateToProps, { logoutUser, clearCurrentProfile }),
)(Navbar);
