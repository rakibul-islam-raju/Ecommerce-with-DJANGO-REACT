import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
	return (
		<>
			<Header />
			<main className="pb-4 mt-3">
				<Container>
					<Outlet />
				</Container>
			</main>
			<Footer />
		</>
	);
};

export default Layout;
