import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase authentication function
import { useNavigate } from "react-router-dom"; // Hook for navigation
import { auth } from "../firebase"; // Import Firebase authentication instance
import "../styles/Login.css"; // Import styles for the login page

/**
 * Login Component
 * ---------------
 * This component provides a login form for users to authenticate with email and password.
 * It includes:
 * - Input fields for email and password.
 * - A login button to submit the form.
 * - A back button to return to the home page.
 * - Error handling for invalid login attempts.
 * - Navigation to the home page upon successful login.
 */
const Login = () => {
  // State variables to store user input and error messages
  const [email, setEmail] = useState(""); // Stores the email input
  const [password, setPassword] = useState(""); // Stores the password input
  const [error, setError] = useState(""); // Stores error messages for failed login attempts
  const navigate = useNavigate(); // Initialize navigate (React Router hook for navigation)

  /**
   * Handles user login.
   * - Prevents default form submission behavior.
   * - Uses Firebase's `signInWithEmailAndPassword` to authenticate the user.
   * - Displays an alert on successful login and navigates to the home page.
   * - Sets an error message if authentication fails.
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful!");
      navigate("/"); // Redirect to profile page on successful login
    } catch (err) {
      setError(err.message);
    }
  };

    // Navigate back to home page
    const handleBackToHome = () => {
      navigate("/");
    };

  return (
    <div className="login-page">
     <button className="menu-button" onClick={handleBackToHome}>
            Back to Home
      </button>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
