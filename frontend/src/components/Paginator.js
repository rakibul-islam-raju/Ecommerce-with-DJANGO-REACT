import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Paginator = ({ next, previous, redirectUrl }) => {
	return (
		<div className="">
			{previous && (
				<Link to={`${redirectUrl}?${previous.split("?")[1]}`}>
					<Button variant="dark" className="btn-sm">
						<i className="fas fa-angle-left"></i> PREVIOUS
					</Button>
				</Link>
			)}
			{next && (
				<Link to={`${redirectUrl}?${next.split("?")[1]}`}>
					<Button variant="dark" className="btn-sm">
						NEXT <i className="fas fa-angle-right"></i>
					</Button>
				</Link>
			)}
		</div>
	);
};

export default Paginator;
