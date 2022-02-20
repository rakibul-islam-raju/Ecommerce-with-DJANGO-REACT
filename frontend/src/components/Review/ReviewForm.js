import React, { useState, useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { createReview } from "../../actions/reviewActions";

const ReviewForm = ({ product }) => {
	const [rating, setRating] = useState(null);
	const [comment, setComment] = useState(null);

	const formRef = useRef(null);

	const dispatch = useDispatch();

	const reviewCreate = useSelector((state) => state.reviewCreate);
	const { loading, success, error } = reviewCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (success) {
			formRef.current.reset();
			setRating(null);
			setComment(null);
		}
	}, [success, dispatch]);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			createReview({
				product: product.id,
				rating,
				comment,
			})
		);
	};

	return (
		<div className="">
			<h4>Add New Review</h4>

			{error && <Message variant="danger">{error}</Message>}

			<form ref={formRef} onSubmit={handleSubmit}>
				<Form.Group controlId="email" className="mb-3">
					<Form.Label>Rating</Form.Label>
					<Form.Control
						as="select"
						onChange={(e) => setRating(e.target.value)}
					>
						<option value="">Select...</option>
						<option value="1">1 (Poor)</option>
						<option value="2">2 (Fair)</option>
						<option value="3">3 (Good)</option>
						<option value="4">4 (Verry Good)</option>
						<option value="5">5 (Excellent)</option>
					</Form.Control>
				</Form.Group>

				<Form.Group className="mb-3" controlId="comment">
					<Form.Label>Comment</Form.Label>
					<Form.Control
						name="comment"
						onChange={(e) => setComment(e.target.value)}
						as="textarea"
						rows={4}
					/>
				</Form.Group>
				{loading ? (
					<Loader />
				) : (
					<Button type="submit" variant="dark" className="w-100">
						Add Review
					</Button>
				)}
			</form>
		</div>
	);
};

export default ReviewForm;
