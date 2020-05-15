import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = (props) => {
	return (
		<div className="btn-group btn-group-primary mb-4" role="group">
			<Link to="/edit-profile" className="btn btn-primary">
				<i className="fas fa-user-circle text-success mr-1"></i> Edit Profile
			</Link>
			<Link to={`/posts/byUser/${props.handle}`} className="btn btn-primary">
				<i className="fas fa-pen text-success mr-2"></i>
				Your Posts
			</Link>
			<a href="add-education.html" className="btn btn-primary">
				<i className="fas fa-graduation-cap text-success mr-1"></i>
				TODO: Your Friends
			</a>
		</div>
	);
};

export default ProfileActions;
