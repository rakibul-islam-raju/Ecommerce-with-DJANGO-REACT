import { Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductItem from "../components/ProductItem";
import Paginator from "../components/Paginator";

const ShopPage = () => {
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);

	const { products, next, previous, loading, error } = productList;

	const location = useLocation();

	const keyword = location?.state?.keyword ?? "";

	useEffect(() => {
		let _;
		dispatch(listProducts(_, keyword));
	}, [dispatch, keyword]);

	return (
		<>
			<h4 className="text-center mb-5">
				{keyword ? `Searched for "${keyword}"` : "All Products"}
			</h4>
			{loading ? (
				<div className="d-flex justify-content-center">
					<Loader />
				</div>
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Row>
						{products.length > 0 ? (
							products?.map((product) => (
								<Col
									key={product.id}
									xs={12}
									md={6}
									lg={4}
									xl={3}
								>
									<ProductItem
										key={product.id}
										product={product}
									/>
								</Col>
							))
						) : (
							<Message variant="warning">
								No Products Found
							</Message>
						)}
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

export default ShopPage;
