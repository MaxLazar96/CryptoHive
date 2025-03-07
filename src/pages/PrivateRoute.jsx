import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
/**
 * PrivateRoute Component
 * ----------------------
 * This component acts as a wrapper to protect routes that require authentication.
 * 
 * Features:
 * - Uses Firebase authentication state (`useAuthState`) to check if a user is logged in.
 * - If the authentication state is still loading, displays a "Loading..." message.
 * - If the user is authenticated, renders the protected content (`children`).
 * - If the user is not logged in, redirects them to the login page.
 * 
 * Props:
 * - `children`: The protected components that should only be accessible by authenticated users.
 */
const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth); // Get the current user and loading state

  // Show a loading message while authentication state is being determined
  if (loading) {
    return <p>Loading...</p>;
  }
  
  // If user is authenticated, render the protected component; otherwise, redirect to login page
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
