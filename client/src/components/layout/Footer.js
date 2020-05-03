import React from "react";

export default function Footer() {
	return (
		<footer
			className="bg-primary text-white p-4 text-center"
			style={{ marginTop: "30vh" }}
		>
			Copyright &copy; {new Date().getFullYear()} Michael Grienauer
		</footer>
	);
}
