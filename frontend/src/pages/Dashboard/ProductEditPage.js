import React, { useEffect, useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { editProduct } from "../../actions/productActions";
import { listCategories } from "../../actions/categoryActions";
import { detailsProduct } from "../../actions/productActions";
import { listBrands } from "../../actions/brandActions";
import { useNavigate, useParams } from "react-router-dom";
import { PRODUCT_EDIT_RESET } from "../../constants/productConstants";

const ProductEditPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { productId } = useParams();

	const productEdit = useSelector((state) => state.productEdit);
	const { loading, error, success } = productEdit;

	const productDetails = useSelector((state) => state.productDetails);
	const {
		loading: loadingDetail,
		error: errorDetail,
		product,
	} = productDetails;

	const categoryList = useSelector((state) => state.categoryList);
	const {
		loading: loadingCategory,
		error: errorCaregory,
		success: successCategory,
		categories,
	} = categoryList;

	const brandList = useSelector((state) => state.brandList);
	const {
		loading: loadingBrand,
		error: errorBrand,
		success: successBrand,
		brands,
	} = brandList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const [productData, setProductData] = useState(null);

	const handleChange = (e) => {
		const field = e.target.name;
		const value = e.target.value;
		const newProductData = { ...productData };
		newProductData[field] = value;
		setProductData(newProductData);
	};

	const handleCheckbox = (e) => {
		const field = e.target.name;
		const value = e.target.checked;
		const newProductData = { ...productData };
		newProductData[field] = value;
		setProductData(newProductData);
	};

	const handleFileUpload = (e) => {
		const field = e.target.name;
		const value = e.target.files[0];
		const newProductData = { ...productData };
		newProductData[field] = value;
		setProductData(newProductData);
	};

	const productEditHandler = (e) => {
		e.preventDefault();

		const formData = new FormData();
		for (var key in productData) {
			formData.append(key, productData[key]);
		}
		dispatch(editProduct(product.id, formData));
	};

	useEffect(() => {
		const config = {
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		dispatch(detailsProduct(productId, config));
		dispatch(listCategories());
		dispatch(listBrands());

		if (success) {
			dispatch({ type: PRODUCT_EDIT_RESET });
			navigate("/dashboard/products");
		}
	}, [dispatch, navigate, success, productId, userInfo]);

	console.log("product ==>>", product);

	return (
		<div>
			<h1 className="mb-5">Edit Product</h1>
			{errorDetail && <Message variant="danger">{errorDetail}</Message>}
			{errorCaregory && (
				<Message variant="danger">{errorCaregory}</Message>
			)}
			{errorBrand && <Message variant="danger">{errorBrand}</Message>}
			{error && <Message variant="danger">{error}</Message>}

			{loadingCategory || loadingBrand || loadingDetail ? (
				<Loader />
			) : (
				<Row>
					<Col md={9}>
						<Form onSubmit={productEditHandler}>
							<Row>
								<Col md={8}>
									<Form.Group
										controlId="name"
										className="mb-3"
									>
										<Form.Label>Product Name</Form.Label>
										<Form.Control
											type="text"
											placeholder="Product Name"
											name="name"
											onChange={handleChange}
											defaultValue={product?.name}
										></Form.Control>
									</Form.Group>
								</Col>
								<Col md={2}>
									<Form.Group
										controlId="price"
										className="mb-3"
									>
										<Form.Label>Price</Form.Label>
										<Form.Control
											type="number"
											placeholder="Price"
											name="price"
											onChange={handleChange}
											defaultValue={product?.price}
										></Form.Control>
									</Form.Group>
								</Col>
								<Col md={2}>
									<Form.Group
										controlId="stock"
										className="mb-3"
									>
										<Form.Label>Stock</Form.Label>
										<Form.Control
											type="number"
											placeholder="Stock"
											name="in_stock"
											onChange={handleChange}
											defaultValue={product?.in_stock}
										></Form.Control>
									</Form.Group>
								</Col>
							</Row>

							<Row>
								<Col md={4}>
									<Form.Group
										controlId="image"
										className="mb-3"
									>
										<Form.Label>New Image</Form.Label>
										<Form.Control
											type="file"
											placeholder="Image"
											name="image"
											onChange={handleFileUpload}
											defaultValue={
												productData?.image?.name
											}
										></Form.Control>
									</Form.Group>
								</Col>
								<Col md={4}>
									<Form.Group
										controlId="category"
										className="mb-3"
									>
										<Form.Label>Category</Form.Label>
										<Form.Select
											name="category"
											onChange={handleChange}
											defaultValue={product.category?.id}
										>
											<option>select Category</option>
											{categories?.map((category) => (
												<option
													key={category.id}
													value={category?.id}
												>
													{category.name}
												</option>
											))}
										</Form.Select>
									</Form.Group>
								</Col>
								<Col md={4}>
									<Form.Group
										controlId="brand"
										className="mb-3"
									>
										<Form.Label>Brand</Form.Label>
										<Form.Select
											name="brand"
											onChange={handleChange}
											defaultValue={product?.brand?.id}
										>
											<option>select Brand</option>
											{brands?.map((brand) => (
												<option
													key={brand.id}
													value={brand?.id}
												>
													{brand.name}
												</option>
											))}
										</Form.Select>
									</Form.Group>
								</Col>
							</Row>

							<Form.Group
								className="mb-3"
								controlId="description"
							>
								<Form.Label>Description</Form.Label>
								<Form.Control
									name="description"
									onChange={handleChange}
									as="textarea"
									rows={4}
									defaultValue={product?.description}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="isActive">
								<Form.Check
									type="checkbox"
									label="Is Active"
									name="is_active"
									onChange={handleCheckbox}
									defaultChecked={product?.is_active}
								/>
							</Form.Group>

							{loading ? (
								<Loader />
							) : (
								<Button
									variant="dark"
									type="submit"
									className="w-100"
								>
									Save
								</Button>
							)}
						</Form>
					</Col>
					<Col md={3}>
						{productData?.image ? (
							<img
								className="img-thumbnail"
								src={URL.createObjectURL(productData?.image)}
								alt={productData?.image.name}
							/>
						) : (
							<img
								className="img-thumbnail"
								src={product?.image}
								alt={product?.name}
							/>
						)}
					</Col>
				</Row>
			)}
		</div>
	);
};

export default ProductEditPage;
