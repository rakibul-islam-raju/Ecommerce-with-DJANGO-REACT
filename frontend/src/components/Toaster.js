import React from "react";
import { Row, Col, Toast, ToastContainer } from "react-bootstrap";

const Toaster = ({ show, setShow, text, variant }) => {
	return (
		<Row>
			<Col xs={6}>
				<ToastContainer position="top-end" className="p-3">
					<Toast
						onClose={() => setShow(false)}
						show={show}
						delay={3000}
						autohide
						bg={variant}
						className="text-white"
					>
						<Toast.Header>
							<img
								src="holder.js/20x20?text=%20"
								className="rounded me-2"
								alt=""
							/>
							<strong className="me-auto">ECOMMERCE</strong>
							{/* <small>11 mins ago</small> */}
						</Toast.Header>
						<Toast.Body>{text}</Toast.Body>
					</Toast>
				</ToastContainer>
			</Col>
		</Row>
	);
};

export default Toaster;
