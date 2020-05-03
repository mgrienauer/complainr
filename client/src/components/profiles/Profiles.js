import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfiles } from "../../actions/profileActions";

class Profiles extends Component {
	componentDidMount() {
		this.props.getPro;
		files();
	}
	render() {
		const { profiles, loading } = this.props.profile;
		let profileItems;

		if (profiles === null || loading) {
			profileItems = (
				<div className="spinner-border text-primary" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			);
		} else {
			if (profiles.length > 0) {
				<h1>Profiles</h1>;
			} else {
				profileItems = <h4>No profiles found...</h4>;
			}
		}

		return (
			<div className="profiles">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4 text-center">Profiles</h1>
							<p className="lead text-center">
								Connect with other complainers...
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
