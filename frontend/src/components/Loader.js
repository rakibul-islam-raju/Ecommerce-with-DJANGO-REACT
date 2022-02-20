import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
	return (
		<div className="text-center">
			<Spinner
				style={{ width: "100px", height: "100px" }}
				animation="border"
				role="status"
			>
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		</div>
	);
};

export default Loader;
