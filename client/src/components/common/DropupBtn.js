import React from "react";

export default function DropupBtn(props) {
	return (
		<div class="btn-group dropup ml-auto">
			<button
				type="button"
				className="btn btn-light rounded-circle ml-auto text-black-50"
				data-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded="false"
			>
				<i className="fas fa-ellipsis-h"></i>
			</button>
			<div class="dropdown-menu dropdown-menu-right mb-2">
				<a
					class="dropdown-item text-danger"
					href="#"
					onClick={() => props.onDeleteClick(props.post_id, props.comment_id)}
				>
					Delete {props.post ? "Post" : "Comment"}
				</a>
			</div>
		</div>
	);
}
