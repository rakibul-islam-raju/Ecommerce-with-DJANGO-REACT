import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";

const SearchBox = () => {
	const [keyword, setKeyword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		let _;
		dispatch(listProducts(_, keyword));
		// navigate(`/?keyword=${keyword}`);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className="d-flex">
				<Form.Control
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					type="text"
					placeholder="Search here..."
				></Form.Control>
				<Button type="submit" variant="secondary">
					<i className="fas fa-search"></i>
				</Button>
			</Form.Group>
		</Form>
	);
};

export default SearchBox;
