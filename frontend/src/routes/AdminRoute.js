import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
	const location = useLocation();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	return userInfo?.is_staff ? (
		children
	) : (
		<Navigate to="/login" replace state={{ from: location.pathname }} />
	);
};

export default AdminRoute;
