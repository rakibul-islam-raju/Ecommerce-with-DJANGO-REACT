import "./assets/css/main.css";
import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProfilePage from "./pages/ProfilePage";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import OrderPage from "./pages/OrderPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import UserListPage from "./pages/Dashboard/UserListPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import Layout from "./components/Layout";
import ProductListPage from "./pages/Dashboard/ProductListPage";
import ProductCreatePage from "./pages/Dashboard/ProductCreatePage";
import ProductEditPage from "./pages/Dashboard/ProductEditPage";
import OrderListPage from "./pages/Dashboard/OrderListPage";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route index element={<HomePage />} />
						<Route path="cart" element={<CartPage />} />
						<Route
							path="product/:productId"
							element={<ProductDetailPage />}
						/>

						{/* public route */}
						<Route
							path="login"
							element={
								<PublicRoute>
									<LoginPage />
								</PublicRoute>
							}
						/>
						<Route
							path="register"
							element={
								<PublicRoute>
									<RegisterPage />
								</PublicRoute>
							}
						/>
						{/* private route */}
						<Route
							path="profile"
							element={
								<PrivateRoute>
									<ProfilePage />
								</PrivateRoute>
							}
						/>
						<Route
							path="shipping"
							element={
								<PrivateRoute>
									<ShippingPage />
								</PrivateRoute>
							}
						/>
						<Route
							path="payment"
							element={
								<PrivateRoute>
									<PaymentPage />
								</PrivateRoute>
							}
						/>
						<Route
							path="order"
							element={
								<PrivateRoute>
									<OrderPage />
								</PrivateRoute>
							}
						/>
						<Route
							path="order/:orderId"
							element={
								<PrivateRoute>
									<OrderDetailPage />
								</PrivateRoute>
							}
						/>
						{/* admin route */}
					</Route>
					<Route
						path="dashboard"
						element={
							<AdminRoute>
								<DashboardLayout />
							</AdminRoute>
						}
					>
						<Route
							index
							element={
								<AdminRoute>
									<Dashboard />
								</AdminRoute>
							}
						/>
						<Route
							path="users"
							element={
								<AdminRoute>
									<UserListPage />
								</AdminRoute>
							}
						/>
						<Route
							path="products"
							element={
								<AdminRoute>
									<ProductListPage />
								</AdminRoute>
							}
						/>
						<Route
							path="create-product"
							element={
								<AdminRoute>
									<ProductCreatePage />
								</AdminRoute>
							}
						/>
						<Route
							path="products/:productId"
							element={
								<AdminRoute>
									<ProductEditPage />
								</AdminRoute>
							}
						/>
						<Route
							path="orders"
							element={
								<AdminRoute>
									<OrderListPage />
								</AdminRoute>
							}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
