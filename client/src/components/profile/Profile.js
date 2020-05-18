import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
	getProfileByHandle,
	getProfileById,
	getCurrentProfile,
} from "../../actions/profileActions";

import ProfileAbout from "./ProfileAbout";
import ProfileHeader from "./ProfileHeader";

//profile container component to fetch user
//profile data via their handle or id
class Profile extends Component {
	componentDidMount() {
		//if props is in the url query
		if (!this.props.preview) {
			if (this.props.match.params.handle) {
				this.props.getProfileByHandle(this.props.match.params.handle);
			}
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
					{!this.props.preview && (
						<div className="row">
							<div className="col-md-6">
								<Link
									to="/feed"
									className="btn btn-outline-secondary mb-3 float-left"
								>
									Back to Feed
								</Link>
							</div>
							<div className="cold-md-6" />
						</div>
					)}
					<div className="row">
						<ProfileHeader profile={profile} />
						<ProfileAbout profile={profile} />
					</div>
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
	getProfileByHandle: PropTypes.func.isRequired,
	getProfileById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	user_id: state.auth.user.id,
});

export default connect(mapStateToProps, {
	getProfileByHandle,
	getProfileById,
	getCurrentProfile,
})(Profile);
