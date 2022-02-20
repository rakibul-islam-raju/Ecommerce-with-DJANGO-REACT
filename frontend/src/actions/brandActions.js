import { REACT_API_URL } from "../utilities/utils";
import axios from "axios";
import {
	BRAND_LIST_REQUEST,
	BRAND_LIST_SUCCESS,
	BRAND_LIST_FAIL,
} from "../constants/brandConstants";

export const listBrands = () => async (dispatch) => {
	try {
		dispatch({ type: BRAND_LIST_REQUEST });

		const { data } = await axios.get(`${REACT_API_URL}/shop/brands`);

		dispatch({ type: BRAND_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: BRAND_LIST_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message,
		});
	}
};
