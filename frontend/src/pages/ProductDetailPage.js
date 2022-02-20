import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Button, Col, ListGroup, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import { REVIEW_CREATE_RESET } from "../constants/reviewConstants";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Toaster from "../components/Toaster";
import ProductReviews from "../components/Review/ProductReviews";
import ReviewForm from "../components/Review/ReviewForm";
import Rating from "react-rating";
import RelatedProducts from "../components/RelatedProducts";

const ProductDetailPage = () => {
	const [show, setShow] = useState(false);
	const [qty, setQty] = useState(1);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { productId } = useParams();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, product, error } = productDetails;

	// console.log("product ==>>", product);

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const reviewCreate = useSelector((state) => state.reviewCreate);
	const { success: successReviewCreate } = reviewCreate;

	// product detail dispatch
	useEffect(() => {
		dispatch(detailsProduct(productId));
		dispatch({ type: REVIEW_CREATE_RESET });
	}, [dispatch, productId, successReviewCreate]);

	// add to cart
	const handleAddToCart = () => {
		dispatch(addToCart(productId, qty));
		setShow(true);
	};

	return (
		<>
			<Toaster
				show={show}
				setShow={setShow}
				text="Product Added to Cart!"
				variant="info"
			/>
			<Button
				onClick={() => navigate(-1)}
				variant="dark"
				className="mb-2"
			>
				BACK
			</Button>

			{loading ? (
				<div className="d-flex justify-content-center">
					<Loader />
				</div>
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Row>
						<Col md={4}>
							<img
								className="img-fluid"
								src={product.image}
								alt={product.name}
							/>
						</Col>
						<Col md={4}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h4>{product.name}</h4>
								</ListGroup.Item>

								<ListGroup.Item>
									<Rating
										readonly
										placeholderRating={
											product?.rating?.rating__avg
										}
										placeholderSymbol={
											<i className="fas fa-star text-warning"></i>
										}
										emptySymbol={
											<i className="fas fa-star text-secondary"></i>
										}
									/>{" "}
									({product.total_reviews})
								</ListGroup.Item>
								<ListGroup.Item>
									Price: <strong>$ {product.price}</strong>
								</ListGroup.Item>
								<ListGroup.Item>
									{product.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={4}>
							<ListGroup>
								<ListGroup.Item>
									Price: ${product.price}
								</ListGroup.Item>
								<ListGroup.Item>
									Status:{" "}
									{product.in_stock > 0
										? "In Stock"
										: "Stock Out"}
								</ListGroup.Item>

								{product.in_stock > 0 && (
									<ListGroup.Item>
										<Row className="align-items-center">
											<Col>Qty:</Col>
											<Col>
												<Form.Control
													type="number"
													value={qty}
													onChange={(e) =>
														setQty(e.target.value)
													}
												/>
											</Col>
										</Row>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									<Button
										onClick={handleAddToCart}
										className="w-100 mt-2"
										variant="dark"
									>
										Add to cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>

					<Row className="mt-5">
						<Col md={6}>
							<ProductReviews product={product} />

							<hr className="mt-5" />

							{!userInfo ? (
								<Link to="/login">
									Please login to add a review.
								</Link>
							) : (
								<ReviewForm product={product} />
							)}
						</Col>
						<Col md={6}>
							<RelatedProducts
								categoryId={product?.category?.id}
							/>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default ProductDetailPage;
