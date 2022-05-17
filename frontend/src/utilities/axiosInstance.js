import axios from "axios";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
import { REACT_API_URL } from "./utils";
import store from "../store";
import { tokenUpdate, logout } from "../actions/userActions";

export const axiosPublicInstance = axios.create({
	REACT_API_URL,
	headers: {
		"Content-type": "application/json",
	},
});

export const axiosPrivateInstance = axios.create({
	REACT_API_URL,
	headers: {
		"Content-type": "application/json",
	},
});

// interceptors
axiosPrivateInstance.interceptors.request.use(
	async (req) => {
		const userData = store?.getState()?.userLogin?.userInfo;

		if (userData?.access) {
			const user = jwt_decode(userData?.access);
			const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

			if (!isExpired) {
				req.headers.Authorization = `Bearer ${userData?.access}`;
				return req;
			}
			const { data } = await axios.post(
				`${REACT_API_URL}/token/refresh/`,
				{
					refresh: userData?.refresh,
				}
			);
			await store.dispatch(tokenUpdate(data));

			req.headers.Authorization = `Bearer ${data?.access}`;
		} else {
			store.dispatch(logout());
		}

		return req;
	},
	(error) => {
		return Promise.reject(error);
	}
);
