import React from "react";

export default function DropupBtn(props) {
	return (
		<div className="btn-group dropup ml-auto">
			<button
				type="button"
				className="btn btn-light rounded-circle ml-auto text-black-50"
				data-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded="false"
			>
				<i className="fas fa-ellipsis-h"></i>
			</button>
			<div className="dropdown-menu dropdown-menu-right mb-2">
				<a
					className="dropdown-item text-danger"
					onClick={() => props.onDeleteClick(props.post_id, props.comment_id)}
				>
					Delete {props.post ? "Post" : "Comment"}
				</a>
			</div>
		</div>
	);
}
