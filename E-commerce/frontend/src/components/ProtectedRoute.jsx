import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, user }) => {
  // const { isAuth } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  if (isAdmin && user?.user?.role == "admin") {
    return <Outlet />;
  }
  if (!isAdmin && token) {
    return <Outlet />;
  }

  // <Outlet /> = ProtectedRoute sarmaladığı yer demek App.jsx de
  <Navigate to="/" />;
};

export default ProtectedRoute;
