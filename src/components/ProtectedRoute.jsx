import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    const loc = useLocation();
    if (loading) return null;
    if (!user) return <Navigate to="/login" replace state={{ from: loc }} />;
    return children;
}