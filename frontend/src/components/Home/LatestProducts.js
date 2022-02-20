import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Paginator from "../../components/Paginator";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import ProductItem from "../../components/ProductItem";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const LatestProducts = () => {
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);

	const { products, next, previous, loading, error } = productList;

	const { search } = useLocation();

	useEffect(() => {
		let _;
		dispatch(listProducts(_, search));
	}, [dispatch, search]);

	return (
		<>
			<h4 className="text-center mb-5">Latest Products</h4>
			{loading ? (
				<div className="d-flex justify-content-center">
					<Loader />
				</div>
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Row>
						{products?.map((product) => (
							<Col key={product.id} xs={12} md={6} lg={4} xl={3}>
								<ProductItem
									key={product.id}
									product={product}
								/>
							</Col>
						))}
					</Row>

					{(next || previous) && (
						<div className="d-flex justify-content-end">
							<Paginator
								next={next}
								previous={previous}
								redirectUrl="/"
							/>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default LatestProducts;
