import React from "react";

export default function Footer() {
	return (
		<footer className="bg-primary text-white p-4 mt-3 text-center">
			Copyright &copy; {new Date().getFullYear()} Michael Grienauer
		</footer>
	);
}
