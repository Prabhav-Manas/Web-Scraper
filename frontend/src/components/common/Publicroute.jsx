import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Loader from './Loader';

// Prevents logged-in users from accessing login/register
const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <Loader />;

    if (user) return <Navigate to="/" replace />;

    return children;
};

export default PublicRoute;