import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivetRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    if (loading) {
        return <span className="loading loading-spinner text-warning"></span>
    }
    if (!user) {
        return <Navigate to='/login' state={{from: location.pathname}}></Navigate>
    }
    return children;
};

export default PrivetRoutes;