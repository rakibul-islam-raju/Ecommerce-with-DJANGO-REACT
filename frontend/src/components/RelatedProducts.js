import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { relatedProducts } from "../actions/productActions";
import Loader from "./Loader";
import Message from "./Message";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ categoryId }) => {
	const dispatch = useDispatch();

	const productRelated = useSelector((state) => state.productRelated);
	const { products, loading, error } = productRelated;

	useEffect(() => {
		dispatch(relatedProducts(categoryId));
	}, [dispatch, categoryId]);

	return (
		<>
			<h4 className="mb-5">Related Products</h4>
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
							<Col key={product.id} xs={12} md={6} xxl={3}>
								<ProductItem
									key={product.id}
									product={product}
								/>
							</Col>
						))}
					</Row>
				</>
			)}
		</>
	);
};

export default RelatedProducts;
