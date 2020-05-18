import React, { Component } from "react";
import Posts from "./Posts";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { getProfileByHandle } from "../../actions/profileActions";

class PostsByUser extends Component {
	componentDidMount() {
		if (this.props.match.params.handle) {
			this.props.getProfileByHandle(this.props.match.params.handle);
		}
	}
	render() {
		let handle = this.props.match.params.handle;
		return (
			<>
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
				<div className="row text-center mb-2">
					<div className="col-12 d-flex justify-content-center">
						<h2>Posts by {handle}</h2>
					</div>
				</div>

				<Posts hideForm byUser={this.props.profile._id} />
			</>
		);
	}
}

Posts.propTypes = {
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getProfileByHandle })(PostsByUser);
