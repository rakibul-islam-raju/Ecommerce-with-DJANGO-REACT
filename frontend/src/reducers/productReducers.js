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
	PRODUCT_CREATE_RESET,
	PRODUCT_EDIT_REQUEST,
	PRODUCT_EDIT_SUCCESS,
	PRODUCT_EDIT_FAIL,
	PRODUCT_EDIT_RESET,
	PRODUCT_TOP_REQUEST,
	PRODUCT_TOP_SUCCESS,
	PRODUCT_TOP_FAIL,
	PRODUCT_RELATED_REQUEST,
	PRODUCT_RELATED_SUCCESS,
	PRODUCT_RELATED_FAIL,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { loading: true, products: [] };

		case PRODUCT_LIST_SUCCESS:
			return {
				loading: false,
				products: action.payload.results,
				next: action.payload.next,
				previous: action.payload.previous,
				count: action.payload.count,
			};

		case PRODUCT_LIST_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const productDetailsReducer = (
	state = { product: { reviews: [] } },
	action
) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return { loading: true, ...state };

		case PRODUCT_DETAILS_SUCCESS:
			return { loading: false, product: action.payload };

		case PRODUCT_DETAILS_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const productDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_DELETE_REQUEST:
			return { loading: true, ...state };

		case PRODUCT_DELETE_SUCCESS:
			return { loading: false, success: true };

		case PRODUCT_DELETE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const productCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_CREATE_REQUEST:
			return { loading: true, ...state };

		case PRODUCT_CREATE_SUCCESS:
			return { loading: false, success: true, product: action.payload };

		case PRODUCT_CREATE_FAIL:
			return { loading: false, error: action.payload };

		case PRODUCT_CREATE_RESET:
			return {};

		default:
			return state;
	}
};

export const productEditReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case PRODUCT_EDIT_REQUEST:
			return { loading: true, ...state };

		case PRODUCT_EDIT_SUCCESS:
			return { loading: false, success: true, product: action.payload };

		case PRODUCT_EDIT_FAIL:
			return { loading: false, error: action.payload };

		case PRODUCT_EDIT_RESET:
			return { product: {} };

		default:
			return state;
	}
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_TOP_REQUEST:
			return { loading: true, ...state };

		case PRODUCT_TOP_SUCCESS:
			return {
				loading: false,
				success: true,
				products: action.payload.results,
				next: action.payload.next,
				previous: action.payload.previous,
				count: action.payload.count,
			};

		case PRODUCT_TOP_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const productRelatedReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_RELATED_REQUEST:
			return { loading: true, ...state };

		case PRODUCT_RELATED_SUCCESS:
			return {
				loading: false,
				success: true,
				products: action.payload.results,
				next: action.payload.next,
				previous: action.payload.previous,
				count: action.payload.count,
			};

		case PRODUCT_RELATED_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
