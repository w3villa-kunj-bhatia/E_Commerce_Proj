import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react";

function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // If the user is not logged in, redirect them to the login page
  if (!isLoggedIn) {
    // Using 'replace' ensures the user cannot navigate back to the protected page after logout
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the child component (the protected route)
  return children;
}

export default ProtectedRoute;
