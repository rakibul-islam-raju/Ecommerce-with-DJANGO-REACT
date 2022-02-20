import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { banUser, makeAdminUser, listUsers } from "../../actions/userActions";
import { useLocation } from "react-router-dom";
import Paginator from "../../components/Paginator";

const UserListPage = () => {
	const dispatch = useDispatch();
	const { search } = useLocation();
	console.log("search=>", search);

	const userList = useSelector((state) => state.userList);
	const { loading, error, users, next, previous } = userList;

	const userMakeAdmin = useSelector((state) => state.userMakeAdmin);
	const {
		loading: loadingAdmin,
		error: errorAdmin,
		success: successAdmin,
	} = userMakeAdmin;

	const userBan = useSelector((state) => state.userBan);
	const {
		loading: loadingBan,
		error: errorBan,
		success: successBan,
	} = userBan;

	// useEffect
	useEffect(() => {
		dispatch(listUsers(search));
	}, [dispatch, successAdmin, successBan, search]);

	const makeAdminUserHandler = (id, adminStatus) => {
		dispatch(makeAdminUser(id, !adminStatus));
	};
	const banUserHandler = (id, activeStatus) => {
		dispatch(banUser(id, !activeStatus));
	};

	return (
		<div>
			<h1>Users</h1>
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
								<th>Name</th>
								<th>Email</th>
								<th>Admin</th>
								<th>Active</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{users.map((user, index) => (
								<tr key={user.id}>
									<td>{index + 1}</td>
									<td>
										{user.first_name} {user.last_name}
									</td>
									<td>{user.email}</td>
									<td>
										{user.is_staff ? (
											<i className="fas fa-check-circle text-success"></i>
										) : (
											<i className="fas fa-times text-danger"></i>
										)}
									</td>
									<td>
										{user.is_active ? (
											<i className="fas fa-check-circle text-success"></i>
										) : (
											<i className="fas fa-times text-danger"></i>
										)}
									</td>
									<td>
										<Button
											onClick={() =>
												makeAdminUserHandler(
													user.id,
													user.is_staff
												)
											}
											variant={
												user.is_staff
													? "info"
													: "danger"
											}
											className="btn-sm"
										>
											<i className="fas fa-user-shield"></i>
										</Button>
										<Button
											onClick={() =>
												banUserHandler(
													user.id,
													user.is_active
												)
											}
											variant={
												user.is_active
													? "info"
													: "danger"
											}
											className="btn-sm"
										>
											<i className="fas fa-ban"></i>
										</Button>
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
								redirectUrl="/dashboard/users/"
							/>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default UserListPage;
