import { REACT_API_URL } from "../utilities/utils";
import {
	REVIEW_CREATE_REQUEST,
	REVIEW_CREATE_SUCCESS,
	REVIEW_CREATE_FAIL,
	REVIEW_LIST_REQUEST,
	REVIEW_LIST_SUCCESS,
	REVIEW_LIST_FAIL,
} from "../constants/reviewConstants";
import {
	axiosPrivateInstance,
	axiosPublicInstance,
} from "../utilities/axiosInstance";

export const createReview = (review) => async (dispatch, getState) => {
	try {
		dispatch({ type: REVIEW_CREATE_REQUEST });

		await axiosPrivateInstance.post(
			`${REACT_API_URL}/shop/reviews`,
			review
		);

		dispatch({ type: REVIEW_CREATE_SUCCESS });
	} catch (error) {
		dispatch({
			type: REVIEW_CREATE_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.response.data.non_field_errors
					? error.response.data.non_field_errors[0]
					: error.message,
		});
	}
};

export const listReview = (id) => async (dispatch) => {
	try {
		dispatch({ type: REVIEW_LIST_REQUEST });

		const { data } = await axiosPublicInstance.get(
			`${REACT_API_URL}/shop/reviews?product=${id}`
		);

		dispatch({ type: REVIEW_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: REVIEW_LIST_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message,
		});
	}
};
