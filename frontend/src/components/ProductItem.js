import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "react-rating";

const ProductItem = ({ product }) => {
	return (
		<Link to={`/product/${product.id}`}>
			<Card>
				<Card.Img variant="top" src={product.image} />
				<Card.Body>
					<Card.Title>{product.name}</Card.Title>
					<Card.Text as="div" className="my-3">
						<Rating
							readonly
							placeholderRating={product?.rating?.rating__avg}
							placeholderSymbol={
								<i className="fas fa-star text-warning"></i>
							}
							emptySymbol={
								<i className="fas fa-star text-secondary"></i>
							}
						/>{" "}
						({product.total_reviews})
					</Card.Text>
					<Card.Text as="h4">$ {product.price}</Card.Text>
				</Card.Body>
			</Card>
		</Link>
	);
};

export default ProductItem;
