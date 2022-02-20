import React, { useEffect } from "react";
import {
	Button,
	Row,
	Col,
	ListGroup,
	Image,
	Card,
	ListGroupItem,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

const OrderPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const cart = useSelector((state) => state.cart);
	const { shippingAddress, paymentMethod, cartItems } = cart;

	const orderCreate = useSelector((state) => state.orderCreate);
	const { loading, error, success, order } = orderCreate;

	cart.itemsPrice = cartItems
		.reduce((acc, item) => acc + item.price * item.qty, 0)
		.toFixed(2);
	cart.shippingPrice = Number(cart.itemsPrice > 100 ? 0 : 10).toFixed(2);
	cart.taxPrice = Number(0.082 * cart.itemsPrice).toFixed(2);
	cart.totalPrice = Number(
		Number(cart.itemsPrice) +
			Number(cart.shippingPrice) +
			Number(cart.taxPrice)
	).toFixed(2);

	// createOrder
	const placeOrder = () => {
		dispatch(
			createOrder({
				orderItems: cartItems,
				shippingAddress: shippingAddress,
				paymentMethod: paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			})
		);
	};

	useEffect(() => {
		if (!cart.paymentMethod) {
			navigate("/payment");
			dispatch({ type: ORDER_CREATE_RESET });
		}
	}, [navigate, cart, dispatch]);

	useEffect(() => {
		if (success) {
			navigate(`/order/${order.id}`);
		}
	}, [success, navigate, order]);

	return (
		<div>
			<CheckoutSteps step1 step2 step3 step4 />
			<hr />

			<h2 className="pt-4 pb-3">Your Order</h2>

			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroupItem>
							<h4>Shipping Address</h4>
							<p>
								{shippingAddress.address},{" "}
								{shippingAddress.city}, {shippingAddress.region}
								, {shippingAddress.country}.{" "}
								<b>{shippingAddress.postalCode}</b>.
							</p>
						</ListGroupItem>
						<ListGroupItem>
							<h4>Payment Method</h4>
							<p>{paymentMethod}</p>
						</ListGroupItem>
						<ListGroupItem>
							<h4>Order Item</h4>
							{cartItems.length === 0 ? (
								<Message variant="danger">
									Your cart is empty!
								</Message>
							) : (
								<ListGroup variant="flush">
									{cartItems.map((item, index) => (
										<ListGroupItem key={index}>
											<Row>
												<Col md={2}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link
														to={`/product/${item.product}`}
													>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} X ${item.price} =
													$
													{(
														item.qty * item.price
													).toFixed(2)}
												</Col>
											</Row>
										</ListGroupItem>
									))}
								</ListGroup>
							)}
						</ListGroupItem>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<Card.Body>
							<ListGroup variant="flush">
								<h4>Order Summary</h4>
								<ListGroupItem>
									<Row>
										<Col>Item: </Col>
										<Col>${cart.itemsPrice}</Col>
									</Row>
								</ListGroupItem>
								<ListGroupItem>
									<Row>
										<Col>Shipping: </Col>
										<Col>${cart.shippingPrice}</Col>
									</Row>
								</ListGroupItem>
								<ListGroupItem>
									<Row>
										<Col>Tax: </Col>
										<Col>${cart.taxPrice}</Col>
									</Row>
								</ListGroupItem>
								<ListGroupItem>
									<Row>
										<Col>Total: </Col>
										<Col>${cart.totalPrice}</Col>
									</Row>
								</ListGroupItem>
								{error && (
									<ListGroupItem>
										<Message variant="danger">
											{error}
										</Message>
									</ListGroupItem>
								)}
								<ListGroupItem>
									{loading ? (
										<Loader />
									) : (
										<Button
											type="button"
											className="btn-dark w-100"
											onClick={placeOrder}
										>
											Place Order
										</Button>
									)}
								</ListGroupItem>
							</ListGroup>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default OrderPage;
