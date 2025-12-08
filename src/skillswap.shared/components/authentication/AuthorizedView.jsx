import './AuthorizedView.css';
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";
import LoadingIndicator from '../commons/LoadingIndicator';

export const AuthorizedView = () => {
    const { session } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (isLoading) {
                setLoadingError(true);
            }
        }, 1000);

        if (session !== null) {
            setIsLoading(false);
        }

        return () => clearTimeout(timeoutId);
    }, [session, isLoading]);

    if (loadingError) {
        return <Navigate to="/shared/login" />;
    }

    if (isLoading || session === null) {
        return <LoadingIndicator />;
    }

    return session !== null ? <Outlet /> : <Navigate to="/shared/login" />;
};

export default AuthorizedView;