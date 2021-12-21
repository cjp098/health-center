import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthOnChange";

export default function PrivateRoute() {
    const isAuthenticated = useContext(AuthContext);

    const isCheck = Object.keys(isAuthenticated);

    return isCheck.length > 0 ? <Outlet /> : <Navigate to="/" />;
}