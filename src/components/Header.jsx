import React from "react";
import { useNavigate } from "react-router-dom"; // React Router hook for navigation
import { auth } from "../firebase"; // Import Firebase authentication module
import DarkModeToggle from "./DarkModeToggle"; // Import the Dark Mode toggle component
import "../styles/Header.css"; // Import styles for the header component

/**
 * Header Component
 * ----------------
 * This component renders the navigation bar of the CryptoHive website.
 * It includes:
 * - Authentication buttons for login, signup, and logout.
 * - A profile button displaying the logged-in user's email (before '@').
 * - A dark mode toggle switch.
 * 
 * Props:
 * - `isLoggedIn`: Boolean indicating if the user is logged in.
 * - `user`: The current authenticated user object (contains user details).
 * - `darkMode`: Boolean for the current dark mode state.
 * - `setDarkMode`: Function to toggle dark mode.
 */

const Header = ({ isLoggedIn, user, darkMode, setDarkMode }) => {
  const navigate = useNavigate(); // React Router hook for navigation

  // Handlers for navigation
  const handleLoginClick = () => navigate("/login");
  const handleSignUpClick = () => navigate("/signup");
  const handleProfilePageClick = () => navigate("/profile");

  /**
   * Handles user logout using Firebase authentication.
   * After logout, the user is redirected to the login page.
   */
  const handleLogoutClick = () => {
    auth.signOut()
      .then(() => {
        navigate("/login"); // Redirect to login page after successful logout
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  };

  return (
    <header className="auth-header">
      <div className="auth-buttons">
        {isLoggedIn ? (
          <div className="auth-logged-in">
            <button className="auth-button profile" onClick={handleProfilePageClick}>
            {user?.email.split('@')[0]}
            </button>
            <button className="auth-button logout" onClick={handleLogoutClick}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <button className="auth-button login" onClick={handleLoginClick}>
              Login
            </button>
            <button className="auth-button signup" onClick={handleSignUpClick}>
              Sign Up
            </button>
          </>
        )}
        <div className="dark-mode-toggle-container">
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </div>
    </header>
  );
};

export default Header;
