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
			renderEmoji = <h3>🍷</h3>;
			break;
		case "Weenie":
			renderEmoji = <h3>🌭</h3>;
			break;
		case "Griper":
			renderEmoji = <h3>🍇</h3>;
			break;
		case "Wambulance Driver":
			renderEmoji = <h3>🚑</h3>;
			break;
		case "Wet Blanket":
			renderEmoji = <h3>🌧️</h3>;
			break;
		case "Boohooer":
			renderEmoji = <h3>👻</h3>;
			break;
		default:
			renderEmoji = <h3></h3>;
	}

	return renderEmoji;
}
