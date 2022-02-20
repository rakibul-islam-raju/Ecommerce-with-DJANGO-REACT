import React from "react";
import { useDispatch } from "react-redux";
import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../../actions/userActions";

const Header = () => {
	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="lg">
				<Container fluid>
					<Navbar.Brand as={Link} to="/dashboard">
						Dashboard
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="navbarScroll" />
					<Navbar.Collapse id="navbarScroll">
						<Nav
							className="ms-auto my-2 my-lg-0 align-items-md-center"
							style={{ maxHeight: "100px" }}
							navbarScroll
						>
							<NavDropdown title="Product" id="products">
								<NavDropdown.Item
									as={Link}
									to="/dashboard/products"
								>
									Products
								</NavDropdown.Item>
								<NavDropdown.Item
									as={Link}
									to="/dashboard/create-product"
								>
									New Product
								</NavDropdown.Item>
							</NavDropdown>
							<NavDropdown title="User" id="users">
								<NavDropdown.Item
									as={Link}
									to="/dashboard/users"
								>
									Users
								</NavDropdown.Item>
							</NavDropdown>
							<NavDropdown title="Order" id="orders">
								<NavDropdown.Item
									as={Link}
									to="/dashboard/orders"
								>
									Orders
								</NavDropdown.Item>
							</NavDropdown>
							<Nav.Link>
								<Button
									variant="light"
									className="btn-sm"
									onClick={logoutHandler}
								>
									<i className="fas fa-sign-in-alt"></i>{" "}
									Logout
								</Button>
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
