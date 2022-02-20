import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Container, Nav, NavDropdown, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";

const Header = () => {
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const nagivate = useNavigate();
	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="lg">
				<Container>
					<Navbar.Brand as={Link} to="/">
						Ecommerce
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="navbarScroll" />
					<Navbar.Collapse id="navbarScroll">
						{/* <Nav className="mx-auto">
							<SearchBox />
						</Nav> */}
						<Nav
							className="ms-auto my-2 my-lg-0"
							style={{ maxHeight: "100px" }}
							// navbarScroll
						>
							<SearchBox />
							<Nav.Link as={Link} to="/cart">
								<i className="fas fa-shopping-cart"></i> Cart{" "}
								<Badge bg="danger">
									{cartItems.reduce(
										(acc, item) => acc + item.qty,
										0
									)}
								</Badge>
							</Nav.Link>
							{userInfo?.email ? (
								<>
									<NavDropdown
										title={userInfo?.first_name}
										id="username"
									>
										{userInfo?.is_staff && (
											<NavDropdown.Item
												onClick={() =>
													nagivate("/dashboard")
												}
											>
												Dashboard
											</NavDropdown.Item>
										)}
										<NavDropdown.Item
											onClick={() => nagivate("/profile")}
										>
											Profile
										</NavDropdown.Item>
										<NavDropdown.Item
											onClick={logoutHandler}
										>
											Logout
										</NavDropdown.Item>
									</NavDropdown>
								</>
							) : (
								<Nav.Link as={Link} to="/login">
									<i className="fas fa-sign-in-alt"></i> Login
								</Nav.Link>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
