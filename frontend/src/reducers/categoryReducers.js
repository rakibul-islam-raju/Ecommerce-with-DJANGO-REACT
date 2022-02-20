import {
	CATEGORY_LIST_REQUEST,
	CATEGORY_LIST_SUCCESS,
	CATEGORY_LIST_FAIL,
} from "../constants/CategoryConstants";

export const categoryListReducer = (state = { categories: [] }, action) => {
	switch (action.type) {
		case CATEGORY_LIST_REQUEST:
			return { loading: true, categories: [] };

		case CATEGORY_LIST_SUCCESS:
			return {
				loading: false,
				categories: action.payload.results,
				next: action.payload.next,
				previous: action.payload.previous,
				count: action.payload.count,
			};

		case CATEGORY_LIST_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
