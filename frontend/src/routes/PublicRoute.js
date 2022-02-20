import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	return userInfo?.token ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
