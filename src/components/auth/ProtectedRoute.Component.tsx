import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Home from "../../pages/Home.Page";

interface ProtectedRoutePropTypes {
    children?:ReactElement;
    user:boolean;
    redirect?:string;
}

const ProtectedRoute = ({children, user, redirect="/login"}:ProtectedRoutePropTypes) => {
    if (!user) return <Navigate to={redirect} />

    return children ? children : <Outlet />;
};

export default ProtectedRoute;

<ProtectedRoute user={false}>
    <Home />
</ProtectedRoute>