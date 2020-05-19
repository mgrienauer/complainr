import React from "react";
import { Link } from "react-router-dom";

export default function NoProfileBtn() {
	return (
		<div className="alert alert-danger" role="alert">
			You must complete your profile before you can make posts. Stop being so
			lazy.
			<div>
				<Link to="/create-profile">
					<button className="btn btn-primary mt-2">Complete Profile</button>
				</Link>
			</div>
		</div>
	);
}
