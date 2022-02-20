import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
	return (
		<div>
			<Row className="justify-content-center">
				<Col md={3}>
					<Link to="/dashboard/products">
						<Card className="bg-info text-white text-center">
							<Card.Body>Products</Card.Body>
							<Card.Footer>
								<h2 className="text-white">10</h2>
							</Card.Footer>
						</Card>
					</Link>
				</Col>
				<Col md={3}>
					<Link to="/dashboard/users">
						<Card className="bg-success text-white text-center">
							<Card.Body>Users</Card.Body>
							<Card.Footer>
								<h2 className="text-white">10</h2>
							</Card.Footer>
						</Card>
					</Link>
				</Col>
				<Col md={3}>
					<Link to="/dashboard/orders">
						<Card className="bg-danger text-white text-center">
							<Card.Body>Orders</Card.Body>
							<Card.Footer>
								<h2 className="text-white">10</h2>
							</Card.Footer>
						</Card>
					</Link>
				</Col>
			</Row>

			<Outlet />
		</div>
	);
};

export default Dashboard;
