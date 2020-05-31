import React from "react";

export default function StatusEmoji({ status }) {
	//for reference
	const options = [
		{ label: "Whiner", value: "Whiner" },
		{ label: "Weenie", value: "Weenie" },
		{ label: "Griper", value: "Griper" },
		{ label: "Wet Blaket", value: "Wet Blaket" },
		{ label: "Wambulance Driver", value: "Wambulance Driver" },
		{ label: "Boohooer", value: "Boohooer" },
	];
	let renderEmoji;
	switch (status) {
		case "Whiner":
			renderEmoji = (
				<h3>
					<span role="img" aria-label="wine emoji" title="Whiner">
						🍷
					</span>
				</h3>
			);
			break;
		case "Weenie":
			renderEmoji = (
				<h3>
					<span role="img" aria-label="hotdog emoji" title="Weenie">
						🌭
					</span>
				</h3>
			);
			break;
		case "Griper":
			renderEmoji = (
				<h3>
					<span role="img" aria-label="grape emoji" title="Griper">
						🍇
					</span>
				</h3>
			);
			break;
		case "Wambulance Driver":
			renderEmoji = (
				<h3>
					<span
						role="img"
						aria-label="ambulance emoji"
						title="Wambulance Driver"
					>
						🚑
					</span>
				</h3>
			);
			break;
		case "Wet Blanket":
			renderEmoji = (
				<h3>
					<span role="img" aria-label="rain emoji" title="Wet Blanket">
						🌧️
					</span>
				</h3>
			);
			break;
		case "Boohooer":
			renderEmoji = (
				<h3>
					<span role="img" aria-label="ghost emoji" title="Boohooer">
						👻
					</span>
				</h3>
			);
			break;
		default:
			renderEmoji = (
				<h3>
					<span></span>
				</h3>
			);
	}

	return renderEmoji;
}
