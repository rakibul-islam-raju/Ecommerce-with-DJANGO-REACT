import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector, useDispatch } from "react-redux";
import { topProducts } from "../../actions/productActions";
import Loader from "../Loader";
import Message from "../Message";
import ProductItem from "../ProductItem";

const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 4000, min: 3000 },
		items: 5,
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 4,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 3,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
};

const TopRatedProducts = () => {
	const dispatch = useDispatch();
	const productTopRated = useSelector((state) => state.productTopRated);

	const { products, loading, error } = productTopRated;

	useEffect(() => {
		dispatch(topProducts());
	}, [dispatch]);

	return (
		<>
			<h4 className="text-center mb-5">Top Rated Products</h4>

			{loading ? (
				<div className="d-flex justify-content-center">
					<Loader />
				</div>
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Carousel infinite={true} responsive={responsive}>
						{products?.map((product) => (
							<ProductItem
								key={product.id}
								product={product}
								classes="top-rated-item"
							/>
						))}
					</Carousel>
				</>
			)}
		</>
	);
};

export default TopRatedProducts;
