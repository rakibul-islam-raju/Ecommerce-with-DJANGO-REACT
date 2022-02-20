import { REACT_API_URL } from "../utilities/utils";
import axios from "axios";
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
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
import { ORDER_MY_LIST_RESET } from "../constants/orderConstants";

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });
		// POST methd header config
		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};
		// axios POST method
		const { data } = await axios.post(
			`${REACT_API_URL}/auth/login`,
			{ email, password },
			config
		);
		// dispatch USER_LOGIN_SUCCESS
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
		// save userInfo in local storage
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message,
		});
	}
};

export const logout = () => (dispatch) => {
	localStorage.removeItem("userInfo");
	dispatch({ type: USER_LOGOUT });
	dispatch({ type: USER_DETAILS_RESET });
	dispatch({ type: ORDER_MY_LIST_RESET });
	dispatch({ type: USER_LIST_RESET });
};

export const register =
	(firstName, lastName, email, password) => async (dispatch) => {
		try {
			dispatch({ type: USER_REGISTER_REQUEST });
			// POST methd header config
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};
			// axios POST method
			const { data } = await axios.post(
				`${REACT_API_URL}/auth/registration`,
				{ first_name: firstName, last_name: lastName, email, password },
				config
			);
			// dispatch USER_REGISTER_SUCCESS
			dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
			// user login
			dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
			// save userInfo in local storage
			localStorage.setItem("userInfo", JSON.stringify(data));
		} catch (error) {
			dispatch({
				type: USER_REGISTER_FAIL,
				payload:
					error.response && error.response.data.detail
						? error.response.data.detail
						: error.message,
			});
		}
	};

export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_DETAILS_REQUEST });
		// get user token from state
		const {
			userLogin: { userInfo },
		} = getState();
		// request config
		const config = {
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		// get user details
		const { data } = await axios.get(
			`${REACT_API_URL}/users/profile/${id}`,
			config
		);
		// dispatch USER_REGISTER_SUCCESS
		dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message,
		});
	}
};

export const updateUserProfile = (id, user) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
		// get user token from state
		const {
			userLogin: { userInfo },
		} = getState();
		// request config
		const config = {
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		// get user details
		const { data } = await axios.put(
			`${REACT_API_URL}/users/profile/${id}`,
			user,
			config
		);
		// update user
		dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
		// login with new credentional
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
		// save userInfo in local storage
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message,
		});
	}
};

export const listUsers =
	(keyword = "") =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: USER_LIST_REQUEST });
			// get user token from state
			const {
				userLogin: { userInfo },
			} = getState();
			// request config
			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${userInfo.token}`,
				},
			};
			// get user details
			const { data } = await axios.get(
				`${REACT_API_URL}/users${keyword}`,
				config
			);
			// update user
			dispatch({ type: USER_LIST_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: USER_LIST_FAIL,
				payload:
					error.response && error.response.data.detail
						? error.response.data.detail
						: error.message,
			});
		}
	};

export const makeAdminUser =
	(id, adminStatus) => async (dispatch, getState) => {
		try {
			dispatch({ type: USER_MAKE_ADMIN_REQUEST });
			// get user token from state
			const {
				userLogin: { userInfo },
			} = getState();
			// request config
			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${userInfo.token}`,
				},
			};
			// get user details
			const { data } = await axios.patch(
				`${REACT_API_URL}/users/${parseInt(id)}`,
				{ is_staff: adminStatus },
				config
			);
			// update user
			dispatch({ type: USER_MAKE_ADMIN_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: USER_MAKE_ADMIN_FAIL,
				payload:
					error.response && error.response.data.detail
						? error.response.data.detail
						: error.message,
			});
		}
	};

export const banUser = (id, activeStatus) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_BAN_REQUEST });
		// get user token from state
		const {
			userLogin: { userInfo },
		} = getState();
		// request config
		const config = {
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		// get user details
		const { data } = await axios.patch(
			`${REACT_API_URL}/users/${parseInt(id)}`,
			{ is_active: activeStatus },
			config
		);
		// update user
		dispatch({ type: USER_BAN_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_BAN_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message,
		});
	}
};
