import { REACT_API_URL } from "../utilities/utils";
import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_EDIT_REQUEST,
	PRODUCT_EDIT_SUCCESS,
	PRODUCT_EDIT_FAIL,
	PRODUCT_TOP_REQUEST,
	PRODUCT_TOP_SUCCESS,
	PRODUCT_TOP_FAIL,
	PRODUCT_RELATED_REQUEST,
	PRODUCT_RELATED_SUCCESS,
	PRODUCT_RELATED_FAIL,
} from "../constants/productConstants";
import {
	axiosPrivateInstance,
	axiosPublicInstance,
} from "../utilities/axiosInstance";

export const listProducts =
	(config, keyword = "") =>
	async (dispatch) => {
		try {
			dispatch({ type: PRODUCT_LIST_REQUEST });

			const url = keyword
				? `${REACT_API_URL}/shop/products?keyword=${keyword}`
				: `${REACT_API_URL}/shop/products`;

			const { data } = config
				? await axiosPrivateInstance.get(url)
				: await axiosPublicInstance.get(url);

			dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: PRODUCT_LIST_FAIL,
				payload:
					error.response && error.response.data.detail
						? error.response.data.detail
						: error.message,
			});
		}
	};

export const detailsProduct = (id, config) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST });
		const url = `${REACT_API_URL}/shop/products/${parseInt(id)}`;
		const { data } = config
			? await axiosPrivateInstance.get(url)
			: await axiosPublicInstance.get(url);

		dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message,
		});
	}
};

export const deleteProduct = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_DELETE_REQUEST });

		await axiosPrivateInstance.delete(
			`${REACT_API_URL}/shop/products/${parseInt(id)}`
		);

		dispatch({ type: PRODUCT_DELETE_SUCCESS });
	} catch (error) {
		dispatch({
			type: PRODUCT_DELETE_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message,
		});
	}
};

export const createProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_CREATE_REQUEST });

		await axiosPrivateInstance.post(
			`${REACT_API_URL}/shop/products`,
			product
		);

		dispatch({ type: PRODUCT_CREATE_SUCCESS });
	} catch (error) {
		dispatch({
			type: PRODUCT_CREATE_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message,
		});
	}
};

export const editProduct = (id, formData) => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_EDIT_REQUEST });

		const { data } = await axiosPrivateInstance.patch(
			`${REACT_API_URL}/shop/products/${parseInt(id)}`,
			formData
		);

		dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });

		// dispatch product details
		dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_EDIT_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message,
		});
	}
};

export const topProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_TOP_REQUEST });

		const { data } = await axiosPublicInstance.get(
			`${REACT_API_URL}/shop/products/top`
		);

		dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_TOP_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message,
		});
	}
};

export const relatedProducts = (categoryId) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_RELATED_REQUEST });

		const { data } = await axiosPublicInstance.get(
			`${REACT_API_URL}/shop/products/related/${categoryId}`
		);

		dispatch({ type: PRODUCT_RELATED_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_RELATED_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message,
		});
	}
};
