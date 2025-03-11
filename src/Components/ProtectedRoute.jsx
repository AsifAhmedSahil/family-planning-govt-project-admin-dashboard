/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Get the token from localStorage
  const token = localStorage.getItem("authToken");

  // If no token found, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  // If token exists, render the children (protected route)
  return <>{children}</>;
};

export default ProtectedRoute;
