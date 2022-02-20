import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const ProfileEditForm = () => {
	const [firstName, setFirstName] = useState(null);
	const [lastName, setLastName] = useState(null);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState(null);
	const [message, setMessage] = useState("");

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { user, loading, error } = userDetails;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;

	// useEffect
	useEffect(() => {
		if (!user || !user?.email || success) {
			dispatch({ type: USER_UPDATE_PROFILE_RESET });
			dispatch(getUserDetails(userInfo.id));
		} else {
			setFirstName(user?.first_name);
			setLastName(user?.last_name);
			setEmail(user?.email);
		}
	}, [dispatch, user, success, userInfo]);

	const submitHandler = (e) => {
		e.preventDefault();

		const user = {
			first_name: firstName,
			last_name: lastName,
			email: email,
		};

		// vallidation
		if (password) {
			setMessage("");
			if (password !== confirmPassword) {
				setMessage("Password do not match!");
				return false;
			}
			user["password"] = password;
		}

		dispatch(updateUserProfile(userInfo.id, user));

		setPassword("");
		setConfirmPassword("");
	};

	return (
		<>
			<h4 className="mb-5">Edit Profile</h4>
			{error && <Message variant="danger">{error}</Message>}
			{message && <Message variant="danger">{message}</Message>}

			<Form onSubmit={submitHandler}>
				<Row>
					<Col md={6}>
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
					</Col>
					<Col md={6}>
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
					</Col>
				</Row>

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

				<Row>
					<Col md={6}>
						<Form.Group controlId="password" className="mb-3">
							<Form.Label>New Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							></Form.Control>
						</Form.Group>
					</Col>
					<Col md={6}>
						<Form.Group
							controlId="confirmPassword"
							className="mb-3"
						>
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								required={password ? true : false}
								type="password"
								placeholder="Confirm Password"
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
							></Form.Control>
						</Form.Group>
					</Col>
				</Row>

				{loading ? (
					<Loader />
				) : (
					<Button type="submit" variant="dark" className="w-100 mt-4">
						Update Profile
					</Button>
				)}
			</Form>
		</>
	);
};

export default ProfileEditForm;
