import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = (props) => {
	return (
		<div className="btn-group btn-group-primary mb-4" role="group">
			<Link to="/edit-profile" className="btn btn-primary">
				<i className="fas fa-user-circle text-white mr-1"></i> Edit Profile
			</Link>
			<Link to={`/posts/byUser/${props.handle}`} className="btn btn-primary">
				<i className="fas fa-pen text-white mr-2"></i>
				Your Posts
			</Link>
			<Link className="btn btn-secondary" style={{ cursor: "not-allowed" }}>
				<i className="fas fa-user-friends mr-1"></i>
				Coming Soon: Friends
			</Link>
		</div>
	);
};

export default ProfileActions;
