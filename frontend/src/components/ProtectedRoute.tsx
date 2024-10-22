// import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import jwt from 'jsonwebtoken';

// const SECRET_KEY: string = import.meta.env.VITE_SUPABASE_JWT_SECRET;

// const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isVerified, setIsVerified] = useState(false);


//   function verifyToken() {
//     const token = localStorage.getItem('token');
  
//     if (!token) {
//       console.error('No token found'); 
//       return;
//     }
  
//     fetch('http://localhost:8080/api/v1/auth/verifytoken', { // backend URL
//       method: 'GET', // or 'POST' if your endpoint expects a POST request
//       headers: { 
//         'Content-Type': 'application/json',
//         'Authorization': token // Include the token in the Authorization header
//       }
//     })
//     .then(response => response.json())
//     .then(data => {
//       if (data.valid) {
//         console.log('Token is valid');
//         setIsVerified(true)
//         // Proceed with authenticated user actions
//       } else {
//         console.error('Invalid token');
//         setIsVerified(false)
//         // Handle invalid token case
//       }
//     })
//     .catch(error => console.error('Error:', error));
// }

// verifyToken()

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     console.log('Token found:', token); // Debugging line

//     // add code for call to endpoint to verify if token is valid here

//     if (isVerified) {
//       // Verify token
//         setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//     setLoading(false); // Ensure loading is set to false after check
//   }, []);

//   if (loading) {
//     // While checking the authentication status, show a loader or nothing
//     return null; // or return a spinner/loader
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/" />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found');
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/v1/auth/verifytoken', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          }
        });
        
        const data = await response.json();
        if (data.valid) {
          console.log('Token is valid');
          setIsVerified(true);
          setIsAuthenticated(true); // Set authenticated if token is valid
        } else {
          console.error('Invalid token');
          setIsVerified(false);
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
  }

  return <>{children}</>;
};

export default ProtectedRoute;