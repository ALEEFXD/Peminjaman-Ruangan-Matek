import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ children }) => {

    const { user, loginStudent, loginAdmin, logout, loading, error } = useAuth();
    if (loading) {
        return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role == 'student') {

        return children ? children : <Outlet />;
    }

    return <Navigate to="/login" replace />;
}

export default ProtectedRoute;