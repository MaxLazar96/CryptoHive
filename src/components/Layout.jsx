import React, { useState, useEffect } from "react";
import Header from "./Header"; // Import the Header component
import { auth } from "../firebase"; // Import Firebase authentication

/**
 * Layout Component
 * ----------------
 * This component serves as the main layout wrapper for the CryptoHive website.
 * It includes:
 * - A `Header` component for navigation and authentication controls.
 * - A `main` section to display child components (content pages).
 * - Dark mode state management using local storage.
 * - User authentication state tracking with Firebase.
 * 
 * Props:
 * - `children`: The content (React components) that will be rendered inside the layout.
 */

const Layout = ({ children }) => {
   // State to store user authentication details
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Dark mode state, initialized from local storage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  /**
   * Effect Hook: Manages dark mode styling.
   * - Adds/removes "dark" class to `document.body` based on `darkMode` state.
   * - Saves dark mode preference in `localStorage` for persistence.
   */
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  /**
   * Effect Hook: Monitors user authentication state.
   * - Listens for changes in Firebase authentication.
   * - Updates `user` and `isLoggedIn` states accordingly.
   * - Cleans up the listener when the component unmounts.
   */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setIsLoggedIn(!!currentUser); // Convert user object to boolean
    });

    return () => unsubscribe(); // Cleanup function to prevent memory leaks
  }, []);

  return (
    <div className={`layout-container ${darkMode ? "dark" : ""}`}>
      <Header isLoggedIn={isLoggedIn} user={user} darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
