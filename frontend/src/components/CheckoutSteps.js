import React from "react";
import { Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
	return (
		<Nav className="justify-content-center mb-4">
			<Nav.Item>
				{step1 ? (
					<NavLink to="/login">Login</NavLink>
				) : (
					<span>Login</span>
				)}
			</Nav.Item>
			<Nav.Item>
				{step2 ? (
					<NavLink
						to="/shipping"
						className={({ isActive }) =>
							isActive ? "active" : "inactive"
						}
					>
						Shipping
					</NavLink>
				) : (
					<span>Shipping</span>
				)}
			</Nav.Item>
			<Nav.Item>
				{step3 ? (
					<NavLink to="/payment">Payment</NavLink>
				) : (
					<span>Payment</span>
				)}
			</Nav.Item>
			<Nav.Item>
				{step4 ? (
					<NavLink to="/order">Place Order</NavLink>
				) : (
					<span>Place Order</span>
				)}
			</Nav.Item>
		</Nav>
	);
};

export default CheckoutSteps;
