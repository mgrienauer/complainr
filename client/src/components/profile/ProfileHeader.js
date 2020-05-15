import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import { Link } from "react-router-dom";

export default class ProfileHeader extends Component {
	render() {
		const { profile } = this.props;

		return (
			<div className="row">
				<div className="col-md-12">
					<div className="card card-body bg-primary text-white mb-3">
						<div className="row">
							<div className="col-12 d-flex justify-content-center">
								<img
									className="rounded-circle"
									src={profile.user.avatar}
									alt=""
								/>
							</div>
						</div>
						<div className="text-center">
							<h1 className="display-4 text-center">{profile.user.name}</h1>
							<h4 className="text-center">@{profile.handle}</h4>

							<p className="lead text-center">{profile.status}</p>
							<Link to={`/posts/byUser/${profile.handle}`}>
								<button className="btn btn-light mb-2">View Posts</button>
							</Link>

							<p>
								{isEmpty(profile.location) ? null : (
									<span>{profile.location}</span>
								)}
							</p>
							<p>
								{isEmpty(profile.website) ? null : (
									<a
										className="text-white p-2"
										href={profile.website}
										target="_blank"
									>
										<i className="fas fa-globe fa-2x"></i>
									</a>
								)}
								{isEmpty(profile.social && profile.social.twitter) ? null : (
									<a
										className="text-white p-2"
										href={profile.social.twitter}
										target="_blank"
									>
										<i className="fab fa-twitter fa-2x"></i>
									</a>
								)}
								{isEmpty(profile.social && profile.social.facebook) ? null : (
									<a
										className="text-white p-2"
										href={profile.social.facebook}
										target="_blank"
									>
										<i className="fab fa-facebook fa-2x"></i>
									</a>
								)}
								{isEmpty(profile.social && profile.social.instagram) ? null : (
									<a
										className="text-white p-2"
										href={profile.social.instagram}
										target="_blank"
									>
										<i className="fab fa-instagram fa-2x"></i>
									</a>
								)}
								{isEmpty(profile.social && profile.social.youtube) ? null : (
									<a
										className="text-white p-2"
										href={profile.social.youtube}
										target="_blank"
									>
										<i className="fab fa-youtube fa-2x"></i>
									</a>
								)}
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
