import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	productListReducer,
	productDetailsReducer,
	productDeleteReducer,
	productCreateReducer,
	productEditReducer,
	productTopRatedReducer,
	productRelatedReducer,
} from "./reducers/productReducers";
import { categoryListReducer } from "./reducers/categoryReducers";
import { brandListReducer } from "./reducers/brandReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
	userLoginReducer,
	userTokenReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	userListReducer,
	userMakeAdminReducer,
	userBanReducer,
} from "./reducers/userReducers";
import {
	orderCreateReducer,
	orderDetailReducer,
	orderPayReducer,
	orderDeliverReducer,
	orderMyListReducer,
	orderListReducer,
} from "./reducers/orderReducer";

import {
	reviewCreateReducer,
	reviewListReducer,
} from "./reducers/reviewReducers";

// Combine reducers
const reducer = combineReducers({
	// product
	productList: productListReducer,
	productDetails: productDetailsReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	productEdit: productEditReducer,
	productTopRated: productTopRatedReducer,
	productRelated: productRelatedReducer,
	// categories
	categoryList: categoryListReducer,
	// brand
	brandList: brandListReducer,
	// cart
	cart: cartReducer,
	// user
	userLogin: userLoginReducer,
	userToken: userTokenReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userList: userListReducer,
	userMakeAdmin: userMakeAdminReducer,
	userBan: userBanReducer,
	// order
	orderCreate: orderCreateReducer,
	orderDetail: orderDetailReducer,
	orderPay: orderPayReducer,
	orderDeliver: orderDeliverReducer,
	orderMyList: orderMyListReducer,
	orderList: orderListReducer,

	// review
	reviewCreate: reviewCreateReducer,
	reviewList: reviewListReducer,
});

// get cart items from local storage
const cartItemFromStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];

// get userInfo from local storage
const userInfoFromStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

// get shippingAddress from local storage
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
	? JSON.parse(localStorage.getItem("shippingAddress"))
	: {};

const initialState = {
	cart: {
		cartItems: cartItemFromStorage,
		shippingAddress: shippingAddressFromStorage,
	},
	userLogin: { userInfo: userInfoFromStorage },
};

// redux-thund middleware
const middleWare = [thunk];

// store
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
