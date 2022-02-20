import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../../actions/orderActions";
import { Link, useLocation } from "react-router-dom";
import Paginator from "../../components/Paginator";

const OrderListPage = () => {
	const dispatch = useDispatch();
	const { search } = useLocation();

	const orderList = useSelector((state) => state.orderList);
	const { loading, error, orders, next, previous, count } = orderList;

	useEffect(() => {
		dispatch(listOrders(search));
	}, [dispatch, search]);

	return (
		<div>
			<h1>Orders</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Table striped responsive hover className="table-sm">
						<thead>
							<tr>
								<th>SL</th>
								<th>Date</th>
								<th>Total</th>
								<th>Paid</th>
								<th>Delivered</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order, index) => (
								<tr key={order.id}>
									<td>{index + 1}</td>
									<td>
										{new Date(
											order.created_at
										).toLocaleDateString()}
									</td>
									<td>$ {order.total_price}</td>
									<td>
										{order.is_paid ? (
											<i className="fas fa-check-circle text-success"></i>
										) : (
											<i className="fas fa-times text-danger"></i>
										)}
									</td>
									<td>
										{order.is_delivered ? (
											<i className="fas fa-check-circle text-success"></i>
										) : (
											<i className="fas fa-times text-danger"></i>
										)}
									</td>
									<td>
										<Link to={`/order/${order.id}`}>
											<Button variant="dark">
												Details
											</Button>
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</Table>

					{(next || previous) && (
						<div className="d-flex justify-content-end">
							<Paginator
								next={next}
								previous={previous}
								redirectUrl="/dashboard/orders/"
							/>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default OrderListPage;
