import React from "react";
import { Col, Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "../../components/Dashboard/Header";
import Footer from "../../components/Footer";

const DashboardLayout = () => {
	return (
		<>
			<Header />
			<main className="py-4">
				<Container>
					<div className="row" style={{ minHeight: "80vh" }}>
						<Col>
							<Outlet />
						</Col>
					</div>
					{/* <Outlet /> */}
				</Container>
			</main>
			<Footer />
		</>
	);
};

export default DashboardLayout;
