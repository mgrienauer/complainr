import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

export default class ProfileAbout extends Component {
	render() {
		const { profile } = this.props;
		//get users first name
		const firstName = profile.user.name.trim().split(" ")[0];
		//get complaints from profile obj
		const complaints = profile.complaints.map((complaint, index) => (
			<div key={index} className="p-3">
				{complaint}
			</div>
		));

		return (
			<div className="row">
				<div className="col-md-12">
					<div className="card card-body bg-light mb-3">
						<h3 className="text-center text-info">{firstName}'s Sob Story</h3>
						<p className="lead">
							{isEmpty(profile.bio) ? null : <span>{profile.bio}</span>}
						</p>
						<hr />

						<div className="row">
							<div className="col-md-6">
								<h3 className="text-center text-info">Main Complaints</h3>
								<div className="d-flex flex-wrap justify-content-center align-items-center">
									{complaints}
								</div>
							</div>

							<div className="col-md-6">
								<h3 className="text-center text-info">Status</h3>
								<div className="d-flex flex-wrap justify-content-center align-items-center">
									<div className="p-3">{profile.status}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
