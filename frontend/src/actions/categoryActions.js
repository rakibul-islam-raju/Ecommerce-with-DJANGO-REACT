import { REACT_API_URL } from "../utilities/utils";
import axios from "axios";
import {
	CATEGORY_LIST_REQUEST,
	CATEGORY_LIST_SUCCESS,
	CATEGORY_LIST_FAIL,
} from "../constants/CategoryConstants";

export const listCategories = () => async (dispatch) => {
	try {
		dispatch({ type: CATEGORY_LIST_REQUEST });

		const { data } = await axios.get(`${REACT_API_URL}/shop/categories`);

		dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: CATEGORY_LIST_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message,
		});
	}
};
