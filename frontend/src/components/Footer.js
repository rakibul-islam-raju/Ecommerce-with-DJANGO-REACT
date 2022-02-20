import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
	return (
		<footer className="bg-dark py-3">
			<Container>
				<Row>
					<Col>
						<h5 className="text-center text-white">
							Copyright &copy; Ecommerce | 2021
						</h5>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
