import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({ children, authentication = true }) => {
    const [loading, setLoading] = useState(true); // Use `loading` to handle the loading state
    const navigate = useNavigate();

    useEffect(() => {
        const handleNavigation = () => {
            const isAuthenticated = localStorage.getItem('isAuthenticated');

            if (authentication && !isAuthenticated) {
                // Redirect to login if authentication is required
                navigate('/');
            }
            // else {
            //     // Redirect to home if authentication is not required
            //     navigate('/');
            // }
        };

        // Run the navigation logic
        handleNavigation();

        // Optionally, you can set loading to false after navigation
        setLoading(false);
    }, [authentication, navigate]); // Dependency array to re-run effect if `authentication` changes

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return <>{children}</>;
};

export default AuthLayout;
