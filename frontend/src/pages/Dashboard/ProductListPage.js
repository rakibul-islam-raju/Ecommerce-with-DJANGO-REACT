import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstants";
import { listProducts, deleteProduct } from "../../actions/productActions";
import { useNavigate, useLocation } from "react-router-dom";
import Paginator from "../../components/Paginator";

const ProductListPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { search } = useLocation();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, next, previous } = productList;

	const productDelete = useSelector((state) => state.productDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = productDelete;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	// useEffect
	useEffect(() => {
		const config = {
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		dispatch({ type: PRODUCT_CREATE_RESET });
		dispatch(listProducts(config, search));
	}, [dispatch, successDelete, userInfo, search]);

	const productDeteteHandler = (id) => {
		if (window.confirm("Are you sure to delete this product?")) {
			dispatch(deleteProduct(id));
		}
	};

	return (
		<div>
			<div className="d-flex justify-content-between align-items-center">
				<h1>Products</h1>
				<Button
					variant="dark"
					onClick={() => navigate("/dashboard/create-product")}
				>
					Create Product
				</Button>
			</div>

			{loadingDelete ? (
				<Loader />
			) : (
				errorDelete && <Message variant="danger">{errorDelete}</Message>
			)}

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Table striped responsive hover className="table-sm">
						<thead>
							<tr>
								<th></th>
								<th>Name</th>
								<th>Price</th>
								<th>Category</th>
								<th>Brand</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{products.map((product, index) => (
								<tr key={product.id}>
									<td>
										<img
											src={product.image}
											alt={product.name}
											className="img-thumbnail"
											style={{
												maxWidth: "100px",
											}}
										/>
									</td>
									<td>{product.name}</td>
									<td>{product.price}</td>
									<td>{product.category.name}</td>
									<td>{product.brand.name}</td>
									<td>
										<Button
											onClick={() =>
												navigate(
													`/dashboard/products/${product.id}`
												)
											}
											variant="info"
											className="btn-sm"
										>
											<i className="fas fa-edit"></i>
										</Button>
										<Button
											onClick={() =>
												productDeteteHandler(product.id)
											}
											variant="danger"
											className="btn-sm"
										>
											<i className="fas fa-trash-alt"></i>
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
								redirectUrl="/dashboard/products/"
							/>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default ProductListPage;
