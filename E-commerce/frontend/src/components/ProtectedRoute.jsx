import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuth } = useSelector((state) => state.user);
  // <Outlet /> = ProtectedRoute sarmaladığı yer demek App.jsx de
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
