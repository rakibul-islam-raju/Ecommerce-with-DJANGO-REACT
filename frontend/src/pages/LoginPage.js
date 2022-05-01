import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error } = userLogin;

	const navigate = useNavigate();
	const location = useLocation();
	const redirect = location.state?.from || "/";

	const submitHandler = async (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<FormContainer>
			<h2>Login</h2>

			{error && <Message variant="danger">{error}</Message>}

			<Form onSubmit={submitHandler}>
				<Form.Group controlId="email" className="mb-3">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="password" className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				{loading ? (
					<Loader />
				) : (
					<Button variant="dark" type="submit" className="w-100">
						Sign in
					</Button>
				)}

				<p>
					Need an account?{" "}
					<Link
						to={
							redirect
								? `/register?redirect=${redirect}`
								: "/register"
						}
					>
						Register here.
					</Link>
				</p>
			</Form>
		</FormContainer>
	);
};

export default LoginPage;
