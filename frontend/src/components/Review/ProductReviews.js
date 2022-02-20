import React, { useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Rating from "react-rating";
import Message from "../Message";
import { listReview } from "../../actions/reviewActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";

const ProductReviews = ({ product }) => {
	const dispatch = useDispatch();

	const reviewList = useSelector((state) => state.reviewList);
	const { loading, reviews, error } = reviewList;

	useEffect(() => {
		dispatch(listReview(product.id));
	}, [dispatch, product]);
	return (
		<>
			<h4>Reviews</h4>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">error</Message>
			) : reviews?.length === 0 ? (
				<Message variant="warning">No reviews!</Message>
			) : (
				<ListGroup>
					{reviews?.map((review) => (
						<ListGroupItem key={review.id}>
							<div className="d-flex justify-content-between">
								<span>
									{review.added_by.first_name}{" "}
									{review.added_by.last_name}
								</span>
								<blockquote>
									{new Date(
										review.created_at
									).toLocaleDateString()}
								</blockquote>
							</div>
							<Rating
								readonly
								placeholderRating={review.rating}
								placeholderSymbol={
									<i className="fas fa-star text-warning"></i>
								}
								emptySymbol={
									<i className="fas fa-star text-secondary"></i>
								}
							/>
							<p className="mt-3">
								<sup>
									<i className="fas fa-quote-left text-secondary"></i>
								</sup>
								<span className="px-2">{review.comment}</span>
								<sup>
									<i className="fas fa-quote-right text-secondary"></i>
								</sup>
							</p>
						</ListGroupItem>
					))}
				</ListGroup>
			)}
		</>
	);
};

export default ProductReviews;
