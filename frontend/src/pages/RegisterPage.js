import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { register } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");

	const dispatch = useDispatch();
	const userRegister = useSelector((state) => state.userRegister);
	const { userInfo, loading, error } = userRegister;

	const navigate = useNavigate();

	// login redirect url
	const redirect = "/";

	// useEffect
	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [userInfo, navigate, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();

		// vallidation
		setMessage("");
		if (password !== confirmPassword) {
			setMessage("Password do not match!");
			return false;
		}

		dispatch(register(firstName, lastName, email, password));
	};

	return (
		<FormContainer>
			<h2>Create New Account</h2>

			{error && <Message variant="danger">{error}</Message>}
			{message && <Message variant="danger">{message}</Message>}

			<Form onSubmit={submitHandler}>
				<Form.Group controlId="firstName" className="mb-3">
					<Form.Label>First Name</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="Enter First Name"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="firstName" className="mb-3">
					<Form.Label>Last Name</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="Enter Last Name"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="email" className="mb-3">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						required
						type="email"
						placeholder="Enter Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="password" className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						required
						type="password"
						placeholder="Enter Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="confirmPassword" className="mb-3">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						required
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				{loading ? (
					<Loader />
				) : (
					<Button variant="dark" type="submit" className="w-100">
						Register
					</Button>
				)}

				<p>
					Already have an account?{" "}
					<Link
						to={redirect ? `/login?redirect=${redirect}` : "/login"}
					>
						Login here.
					</Link>
				</p>
			</Form>
		</FormContainer>
	);
};

export default LoginPage;
