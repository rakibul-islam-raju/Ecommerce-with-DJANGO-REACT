import { REACT_API_URL } from "../utilities/utils";
import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_DETAIL_REQUEST,
	ORDER_DETAIL_SUCCESS,
	ORDER_DETAIL_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_MY_LIST_REQUEST,
	ORDER_MY_LIST_SUCCESS,
	ORDER_MY_LIST_FAIL,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_DELIVER_FAIL,
} from "../constants/orderConstants";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";
import { axiosPrivateInstance } from "../utilities/axiosInstance";

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_CREATE_REQUEST });

		// get user details
		const { data } = await axiosPrivateInstance.post(
			`${REACT_API_URL}/orders/order`,
			order
		);
		// create order
		dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
		// clear cart
		dispatch({ type: CART_CLEAR_ITEMS, payload: data });
		// clear localstorage
		localStorage.removeItem("cartItems");
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message,
		});
	}
};

export const getOrderDetail = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_DETAIL_REQUEST });
		// get user details
		const { data } = await axiosPrivateInstance.get(
			`${REACT_API_URL}/orders/order/${id}`
		);
		// create order
		dispatch({ type: ORDER_DETAIL_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ORDER_DETAIL_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message,
		});
	}
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_PAY_REQUEST });
		// get user details
		const { data } = await axiosPrivateInstance.patch(
			`${REACT_API_URL}/orders/order/${id}`,
			{ is_paid: true }
		);
		// create order
		dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ORDER_PAY_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message,
		});
	}
};

export const deliverOrder = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_DELIVER_REQUEST });
		// get user details
		const { data } = await axiosPrivateInstance.patch(
			`${REACT_API_URL}/orders/order/${id}`,
			{ is_delivered: true }
		);
		// create order
		dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ORDER_DELIVER_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message,
		});
	}
};

export const myOrderList =
	(keyword = "") =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: ORDER_MY_LIST_REQUEST });
			// get user details
			const { data } = await axiosPrivateInstance.get(
				`${REACT_API_URL}/orders/order${keyword}`
			);
			// create order
			dispatch({ type: ORDER_MY_LIST_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: ORDER_MY_LIST_FAIL,
				payload:
					error.response && error.response.data.detail
						? error.response.data.detail
						: error.message,
			});
		}
	};

export const listOrders =
	(keyword = "") =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: ORDER_LIST_REQUEST });
			// get user details
			const { data } = await axiosPrivateInstance.get(
				`${REACT_API_URL}/orders/order/all${keyword}`
			);
			// create order
			dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: ORDER_LIST_FAIL,
				payload:
					error.response && error.response.data.detail
						? error.response.data.detail
						: error.message,
			});
		}
	};
