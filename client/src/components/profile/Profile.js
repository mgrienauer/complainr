import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getProfileByHandle } from "../../actions/profileActions";

import ProfileAbout from "./ProfileAbout";
import ProfileHeader from "./ProfileHeader";

//profile container component to fetch user
//profile data via their handle
class Profile extends Component {
	componentDidMount() {
		//if props is in the url query
		if (this.props.match.params.handle) {
			this.props.getProfileByHandle(this.props.match.params.handle);
		}
	}

	render() {
		const { profile, loading } = this.props.profile;
		let profileContent;

		if (profile === null || loading) {
			profileContent = (
				<div className="row" style={{ width: "50px" }}>
					<div className="spinner-border text-primary" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			);
		} else {
			profileContent = (
				<div>
					<div className="row">
						<div className="col-md-6">
							<Link to="/profile" className="btn btn-light mb-3 float-left">
								Back to Profiles
							</Link>
						</div>
						<div className="cold-md-6" />
					</div>
					<ProfileHeader profile={profile} />
					<ProfileAbout />
				</div>
			);
		}

		return (
			<div className="profile">
				<div className="container">
					<div className="row">
						<div className="col-md-12">{profileContent}</div>
					</div>
				</div>
			</div>
		);
	}
}

Profile.propTypes = {
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	getProfileByHandle: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
