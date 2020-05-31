import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";
import Profile from "../profile/Profile";

class Dashboard extends Component {
	//once component mounts, fetch profile data from backend
	componentDidMount() {
		this.props.getCurrentProfile();
	}

	onDeleteClick = (event) => {
		this.props.deleteAccount();
	};

	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;

		let dashboardContent;
		if (profile === null || loading) {
			dashboardContent = (
				<div className="spinner-border text-primary" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			);
		} else {
			//check if user already has profile
			if (Object.keys(profile).length > 0) {
				dashboardContent = (
					<div>
						<p className="lead text-muted">
							Welcome{" "}
							<Link to={`/profile/handle/${profile.handle}`}>{user.name}</Link>
						</p>
						<ProfileActions handle={profile.handle} />
						<h2 className="lead mb-3">Profile Preview</h2>
						<Profile preview />
						<div className="row mt-5">
							<div className="col-12 d-flex justify-content-end">
								<button
									className="btn btn-outline-danger"
									data-toggle="modal"
									data-target="#deleteAccountModal"
								>
									Delete Account
								</button>

								<div
									class="modal fade"
									id="deleteAccountModal"
									tabindex="-1"
									role="dialog"
									aria-labelledby="Delete Account Popup"
									aria-hidden="true"
								>
									<div class="modal-dialog" role="document">
										<div class="modal-content">
											<div class="modal-header">
												<h5 class="modal-title">Delete Account</h5>
												<button
													type="button"
													class="close"
													data-dismiss="modal"
													aria-label="Close"
												>
													<span aria-hidden="true">&times;</span>
												</button>
											</div>
											<div class="modal-body">
												<p>
													So you want to delete your account? You big
													crybaby...this is so typical. Once you delete it,
													there's no getting it back!
												</p>
											</div>
											<div class="modal-footer">
												<button
													type="button"
													class="btn btn-secondary"
													data-dismiss="modal"
												>
													Close
												</button>
												<button
													type="button"
													onClick={this.onDeleteClick}
													class="btn btn-danger"
												>
													Delete Account <span>😭</span>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			} else {
				//user is logged in but has no profile
				dashboardContent = (
					<div>
						<p className="lead text-muted">Welcome {user.name}</p>
						<p>
							You have not yet set up a profile. Please boss up and set one up.
						</p>
						<Link to="/create-profile" className="btn btn-lg btn-primary">
							Create Profile
						</Link>
					</div>
				);
			}
		}

		return (
			<div className="dashboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4">Dashboard</h1>
							{dashboardContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

//define proptype that Dashboard expects to receive
Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
	errors: state.errors,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
	Dashboard,
);
