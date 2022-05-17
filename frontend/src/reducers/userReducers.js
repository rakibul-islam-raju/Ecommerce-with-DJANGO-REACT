import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_AUTH_TOKEN_SUCCESS,
	USER_AUTH_TOKEN_RESET,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_RESET,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_UPDATE_PROFILE_RESET,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_RESET,
	USER_MAKE_ADMIN_REQUEST,
	USER_MAKE_ADMIN_SUCCESS,
	USER_MAKE_ADMIN_FAIL,
	USER_BAN_REQUEST,
	USER_BAN_SUCCESS,
	USER_BAN_FAIL,
} from "../constants/userConstants";

export const userTokenReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_AUTH_TOKEN_SUCCESS:
			return { tokens: action.payload };
		case USER_AUTH_TOKEN_RESET:
			return {};
		default:
			return state;
	}
};

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userDetailsReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return { ...state, loading: true };
		case USER_DETAILS_SUCCESS:
			return { loading: false, user: action.payload };
		case USER_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		case USER_DETAILS_RESET:
			return { user: {} };
		default:
			return state;
	}
};

export const userUpdateProfileReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_UPDATE_PROFILE_REQUEST:
			return { loading: true };
		case USER_UPDATE_PROFILE_SUCCESS:
			return { loading: false, success: true, userInfo: action.payload };
		case USER_UPDATE_PROFILE_FAIL:
			return { loading: false, success: false, error: action.payload };
		case USER_UPDATE_PROFILE_RESET:
			return {};
		default:
			return state;
	}
};

export const userListReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case USER_LIST_REQUEST:
			return { loading: true };
		case USER_LIST_SUCCESS:
			return {
				loading: false,
				users: action.payload.results,
				next: action.payload.next,
				previous: action.payload.previous,
				count: action.payload.count,
			};
		case USER_LIST_FAIL:
			return { loading: false, error: action.payload };
		case USER_LIST_RESET:
			return { users: [] };
		default:
			return state;
	}
};

export const userMakeAdminReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_MAKE_ADMIN_REQUEST:
			return { loading: true };
		case USER_MAKE_ADMIN_SUCCESS:
			return { loading: false, success: true };
		case USER_MAKE_ADMIN_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userBanReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_BAN_REQUEST:
			return { loading: true };
		case USER_BAN_SUCCESS:
			return { loading: false, success: true };
		case USER_BAN_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
