import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

export default class ProfileAbout extends Component {
	render() {
		const { profile } = this.props;
		//get users first name
		const firstName = profile.user.name.trim().split(" ")[0];
		//get complaints from profile obj
		const complaints = profile.complaints.map((complaint, index) => (
			<div key={index} className="p-3 lead">
				{complaint}
			</div>
		));

		return (
			<div className="col-12 col-md-7">
				<div className="card card-body bg-white mb-3 px-5">
					<h3 className="text-center text-primary">{firstName}'s Sob Story</h3>
					<p className="lead">
						{isEmpty(profile.bio) ? null : <span>{profile.bio}</span>}
					</p>
					<hr />

					<div className="col-12">
						<h3 className="text-center text-primary">Main Complaints</h3>
						<div className="d-flex flex-wrap justify-content-center align-items-center">
							{complaints}
						</div>
					</div>
					<hr />

					<div className="col-12">
						<h3 className="text-center text-primary">Status</h3>
						<div className="d-flex flex-wrap justify-content-center align-items-center">
							<div className="p-3 lead">{profile.status}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
