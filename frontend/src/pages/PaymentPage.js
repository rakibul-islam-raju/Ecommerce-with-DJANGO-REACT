import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentPage = () => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [paymentMethod, setPaymentMethod] = useState("Paypal");

	useEffect(() => {
		if (!shippingAddress.address) navigate("/shipping");
	}, [navigate, shippingAddress.address]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		navigate("/order");
	};
	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3></CheckoutSteps>
			<hr />

			<h2 className="pt-4 pb-3">Select Payment Method</h2>

			<Form onSubmit={submitHandler}>
				<Form.Group controlId="payment" className="mb-3">
					<Form.Label as="legend">Select Method</Form.Label>
					<Col>
						<Form.Check
							type="radio"
							label="Paypal or Credit Card"
							id="paypal"
							name="paymentMethod"
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
					</Col>
				</Form.Group>
				<Button variant="dark" type="submit" className="w-100">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentPage;
