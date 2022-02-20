import React, { useEffect, useState } from "react";
import {
	Row,
	Col,
	ListGroup,
	Image,
	Card,
	ListGroupItem,
	Button,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
	getOrderDetail,
	payOrder,
	deliverOrder,
} from "../actions/orderActions";
import {
	ORDER_PAY_RESET,
	ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import { REACT_APP_URL, paypalClientID } from "../utilities/utils";
import { PayPalButton } from "react-paypal-button-v2";

const OrderDetailPage = () => {
	const { orderId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [itemsPrice, setItemsPrice] = useState(null);
	const [sdkReady, setSdkReady] = useState(false);

	const orderDetail = useSelector((state) => state.orderDetail);
	const { loading, error, order } = orderDetail;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const orderPay = useSelector((state) => state.orderPay);
	const {
		loading: loadingPay,
		success: successPay,
		error: errorPay,
	} = orderPay;

	const orderDeliver = useSelector((state) => state.orderDeliver);
	const {
		loading: loadingDeliver,
		success: successDeliver,
		error: errorDeliver,
	} = orderDeliver;

	const paypalBtnScript = () => {
		const script = document.createElement("script");
		script.type = "text/javascript";
		script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientID}&currency=USD`;
		script.async = true;
		script.onload = () => {
			setSdkReady(true);
		};
		document.body.appendChild(script);
	};

	useEffect(() => {
		if (!loading && order) {
			let price = 0;
			order.order_items.forEach((item) => {
				price += Number(item.quantity) * parseFloat(item.price);
			});
			setItemsPrice(price.toFixed(2));
		}
	}, [order, loading]);

	useEffect(() => {
		if (
			!order ||
			successPay ||
			order.id !== Number(orderId) ||
			successDeliver
		) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch({ type: ORDER_DELIVER_RESET });

			dispatch(getOrderDetail(orderId));
		} else if (!order.is_paid) {
			if (!window.paypal) {
				paypalBtnScript();
			} else {
				setSdkReady(true);
			}
		}
	}, [order, orderId, dispatch, successPay, successDeliver]);

	const successPaymentHandler = (paymentResult) => {
		dispatch(payOrder(order.id, paymentResult));
	};

	const deliverHandler = () => {
		dispatch(deliverOrder(order.id));
	};

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<div>
			<h2 className="pt-4 pb-3">Order Details</h2>
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroupItem>
							<h4>Shipping Address</h4>
							<p></p>
							<p></p>
							<p>
								Name: {order.user.first_name}{" "}
								{order.user.last_name} <br />
								Email: {order.user.email} <br />
								Address: {order.shipping_address.address},{" "}
								{order.shipping_address.city},{" "}
								{order.shipping_address.region},{" "}
								{order.shipping_address.country}.{" "}
								<b>{order.shipping_address.postalCode}</b>
							</p>
							{order?.is_delivered ? (
								<Message variant="success">Delivired</Message>
							) : (
								<Message variant="warning">
									Not Delivired
								</Message>
							)}
						</ListGroupItem>
						<ListGroupItem>
							<h4>Payment Method</h4>
							<p>{order.payment_method}</p>
							{order?.is_paid ? (
								<Message variant="success">Paid</Message>
							) : (
								<Message variant="warning">Not Paid</Message>
							)}
						</ListGroupItem>
						<ListGroupItem>
							<h4>Order Item</h4>

							<ListGroup variant="flush">
								{order.order_items.map((item, index) => (
									<ListGroupItem key={index}>
										<Row>
											<Col md={2}>
												<Image
													src={`${REACT_APP_URL}${item.image}`}
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
												{item.quantity} X ${item.price}{" "}
												= $
												{(
													item.quantity * item.price
												).toFixed(2)}
											</Col>
										</Row>
									</ListGroupItem>
								))}
							</ListGroup>
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
										<Col>{itemsPrice}</Col>
									</Row>
								</ListGroupItem>
								<ListGroupItem>
									<Row>
										<Col>Shipping: </Col>
										<Col>${order.shipping_price}</Col>
									</Row>
								</ListGroupItem>
								<ListGroupItem>
									<Row>
										<Col>Tax: </Col>
										<Col>${order.tax_price}</Col>
									</Row>
								</ListGroupItem>
								<ListGroupItem>
									<Row>
										<Col>Total: </Col>
										<Col>${order.total_price}</Col>
									</Row>
								</ListGroupItem>
								{!order.is_paid && (
									<ListGroupItem>
										{loadingPay && <Loader />}
										{!sdkReady ? (
											<Loader />
										) : (
											<PayPalButton
												amount={order.total_price}
												onSuccess={
													successPaymentHandler
												}
											/>
										)}
									</ListGroupItem>
								)}

								{loadingDeliver ? (
									<Loader />
								) : (
									userInfo.is_staff &&
									order.is_paid &&
									!order.is_delivered && (
										<ListGroupItem>
											<Button
												variant="dark"
												onClick={deliverHandler}
												className="w-100"
											>
												Mark As Deliver
											</Button>
										</ListGroupItem>
									)
								)}
							</ListGroup>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default OrderDetailPage;
