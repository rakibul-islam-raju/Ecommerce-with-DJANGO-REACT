import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Paginator from "../Paginator";
import { Link, useLocation } from "react-router-dom";
import Message from "../Message";
import Loader from "../Loader";
import { myOrderList } from "../../actions/orderActions";

const MyOrdersList = () => {
	const dispatch = useDispatch();
	const { search } = useLocation();

	const orderMyList = useSelector((state) => state.orderMyList);
	const {
		loading: loadingOrders,
		error: errorOrders,
		orders,
		next,
		previous,
		count,
	} = orderMyList;

	useEffect(() => {
		dispatch(myOrderList(search));
	}, [dispatch, search]);

	return (
		<div>
			<h4>My Orders</h4>
			{loadingOrders ? (
				<Loader />
			) : errorOrders ? (
				<Message variant="danger">{errorOrders}</Message>
			) : orders.length === 0 ? (
				<Message variant="warning">You have no orders.</Message>
			) : (
				<Table striped responsive className="table-sm">
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
										<Button variant="dark">Details</Button>
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}

			{(next || previous) && (
				<div className="d-flex justify-content-end">
					<Paginator
						next={next}
						previous={previous}
						redirectUrl="/profile/"
					/>
				</div>
			)}
		</div>
	);
};

export default MyOrdersList;
