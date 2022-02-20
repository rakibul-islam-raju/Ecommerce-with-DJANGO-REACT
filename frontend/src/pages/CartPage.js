import React from "react";
import { Col, Row, Button, ListGroup, Form, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Message from "../components/Message";

const CartPage = () => {
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleUpdateQuantity = (id, qty) => {
		dispatch(addToCart(id, qty));
	};

	const handleRemoveFromCart = (id) => {
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		navigate("/shipping");
	};

	return (
		<Row>
			<Col md={8}>
				<h2 className="mb-5">Shopping Cart</h2>
				{cartItems.length === 0 ? (
					<>
						<Message variant="warning">Your cart is empty!</Message>
						<Link to="/">
							<Button variant="dark">Shop Now</Button>
						</Link>
					</>
				) : (
					<>
						<ListGroup variant="flush">
							{cartItems.map((item) => (
								<ListGroup.Item key={item.product}>
									<Row className="align-items-center">
										<Col md={2}>
											<img
												className="img-thumbnail"
												src={item.image}
												alt=""
											/>
										</Col>
										<Col md={3}>
											<Link
												to={`/product/${item.product}`}
											>
												{item.name}
											</Link>
										</Col>
										<Col md={3}>$ {item.price}</Col>
										<Col md={2}>
											<Form.Control
												type="number"
												value={item.qty}
												onChange={(e) =>
													handleUpdateQuantity(
														item.product,
														Number(e.target.value)
													)
												}
												min={1}
												max={10}
											/>
										</Col>
										<Col md={2}>
											<Button
												variant="dark"
												onClick={() =>
													handleRemoveFromCart(
														item.product
													)
												}
											>
												<i className="fa fa-trash-alt"></i>
											</Button>
										</Col>
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup>
					</>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h3>
								Subtotal (
								{cartItems.reduce(
									(acc, item) => acc + item.qty,
									0
								)}
								) Items
							</h3>
							${" "}
							{cartItems
								.reduce(
									(acc, item) => acc + item.qty * item.price,
									0
								)
								.toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								variant="dark"
								className="w-100 mt-2"
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}
							>
								Proceed To Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

export default CartPage;
