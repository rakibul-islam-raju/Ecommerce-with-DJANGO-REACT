import React, { useEffect, useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../actions/productActions";
import { listCategories } from "../../actions/categoryActions";
import { listBrands } from "../../actions/brandActions";
import { useNavigate } from "react-router-dom";

const ProductCreatePage = () => {
	const [productData, setProductData] = useState({});

	const handleChange = (e) => {
		const field = e.target.name;
		const value = e.target.value;
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

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const productCreate = useSelector((state) => state.productCreate);
	const { loading, error, success } = productCreate;

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

	const createProductHandler = (e) => {
		e.preventDefault();

		const formData = new FormData();
		for (var key in productData) {
			formData.append(key, productData[key]);
		}
		dispatch(createProduct(formData));
	};

	useEffect(() => {
		dispatch(listCategories());
		dispatch(listBrands());

		if (success) {
			navigate("/dashboard/products");
		}
	}, [dispatch, navigate, success]);

	return (
		<div>
			<h1 className="mb-5">Create Product</h1>
			{errorCaregory && (
				<Message variant="danger">{errorCaregory}</Message>
			)}
			{errorBrand && <Message variant="danger">{errorBrand}</Message>}
			{error && <Message variant="danger">{error}</Message>}

			{loadingCategory || loadingBrand ? (
				<Loader />
			) : (
				<Row>
					<div className="Col">
						<Form onSubmit={createProductHandler}>
							<Row>
								<Col md={8}>
									<Form.Group
										controlId="name"
										className="mb-3"
									>
										<Form.Label>Product Name</Form.Label>
										<Form.Control
											required
											type="text"
											placeholder="Product Name"
											name="name"
											onChange={handleChange}
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
											required
											type="number"
											placeholder="Price"
											name="price"
											onChange={handleChange}
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
											required
											type="number"
											placeholder="Stock"
											name="in_stock"
											onChange={handleChange}
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
										<Form.Label>Image</Form.Label>
										<Form.Control
											required
											type="file"
											placeholder="Image"
											id="image"
											name="image"
											onChange={handleFileUpload}
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
											id="category"
											name="category"
											onChange={handleChange}
										>
											<option>select Category</option>
											{categories.map((category) => (
												<option
													value={category.id}
													key={category.id}
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
											id="brand"
											name="brand"
											onChange={handleChange}
										>
											<option>select Brand</option>
											{brands.map((brand) => (
												<option
													value={brand.id}
													key={brand.id}
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
									id="deacription"
									name="description"
									onChange={handleChange}
									as="textarea"
									rows={4}
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
					</div>
				</Row>
			)}
		</div>
	);
};

export default ProductCreatePage;
