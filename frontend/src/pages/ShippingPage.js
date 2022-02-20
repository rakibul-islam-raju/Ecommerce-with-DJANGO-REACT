import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions";

const ShippingPage = () => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const dispatch = useDispatch();

	const [address, setAddress] = useState(shippingAddress.address || null);
	const [city, setCity] = useState(shippingAddress.city || null);
	const [postalCode, setPostalCode] = useState(
		shippingAddress.postalCode || null
	);
	const [region, setRegion] = useState(shippingAddress.region || null);
	const [country, setCountry] = useState(shippingAddress.country || null);
	const [message, setMessage] = useState(null);

	let loading;
	let error;

	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		console.log(address, city, postalCode, region, country);
		dispatch(
			saveShippingAddress({ address, city, postalCode, region, country })
		);
		navigate("/payment");
	};

	return (
		<div>
			<FormContainer>
				<CheckoutSteps step1 step2 />
				<hr />

				<h2 className="pt-4 pb-3">Shipping Address</h2>

				{error && <Message variant="danger">{error}</Message>}
				{message && <Message variant="danger">{message}</Message>}

				<Form onSubmit={submitHandler}>
					<Form.Group controlId="address" className="mb-3">
						<Form.Label>Address</Form.Label>
						<Form.Control
							required
							type="text"
							placeholder="Address"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Row>
						<Col md={6}>
							<Form.Group controlId="city" className="mb-3">
								<Form.Label>City</Form.Label>
								<Form.Control
									required
									type="text"
									placeholder="City"
									value={city}
									onChange={(e) => setCity(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group controlId="postalcode" className="mb-3">
								<Form.Label>Postal Code</Form.Label>
								<Form.Control
									required
									type="text"
									placeholder="Postal Code"
									value={postalCode}
									onChange={(e) =>
										setPostalCode(e.target.value)
									}
								></Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<Form.Group controlId="region" className="mb-3">
								<Form.Label>Region</Form.Label>
								<Form.Control
									required
									type="text"
									placeholder="Region"
									value={region}
									onChange={(e) => setRegion(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group controlId="country" className="mb-3">
								<Form.Label>Country</Form.Label>
								<Form.Control
									required
									type="text"
									placeholder="Country"
									value={country}
									onChange={(e) => setCountry(e.target.value)}
								></Form.Control>
							</Form.Group>
						</Col>
					</Row>

					{loading ? (
						<Loader />
					) : (
						<Button variant="dark" type="submit" className="w-100">
							Continue
						</Button>
					)}
				</Form>
			</FormContainer>
		</div>
	);
};

export default ShippingPage;
