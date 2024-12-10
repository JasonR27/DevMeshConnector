
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios, { AxiosError, AxiosResponse } from 'axios';

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // const response = await axios.get(`${authUrl}/userinfo/`);
        const response = await axios.get('http://localhost:8080/api/v1/auth/verifytoken', {
          withCredentials: true, // Include cookies in the request
          headers: {
            'Content-Type': 'application/json',
            // No need to include Authorization header, the cookie will be sent automatically
          }
        });
        
        const data = await response.data;

        if (data) {
          console.log('Token is valid');
          setIsAuthenticated(true); // Set authenticated if token is valid
        } else {
          console.error('Invalid token');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Ensure loading is set to false after check
      }
    };

    verifyToken(); // Call the verifyToken function
  }, []);

  if (loading) {
    return null; // or return a spinner/loader
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;