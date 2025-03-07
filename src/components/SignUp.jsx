import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import "../styles/SignUp.css";
/**
 * SignUp Component
 * ----------------
 * This component provides a sign-up form for new users.
 * 
 * Features:
 * - Registers a new user with Firebase Authentication.
 * - Saves user information in Firestore (email, user ID, and an empty favorites array).
 * - Displays error messages for invalid inputs.
 * - Redirects the user to the homepage upon successful registration.
 */
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /**
   * Handles the sign-up form submission.
   * - Creates a new user in Firebase Authentication.
   * - Stores user information in Firestore.
   * - Navigates to the home page on successful registration.
   */
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("User Signed Up:", user); // Debug: Log user object
      // Check if the UID exists
    if (!user || !user.uid) {
      console.error("Error: User UID is missing!");
      return;
    }

      // Save user information in Firestore with an empty favorites array
      await setDoc(doc(db, "users", user.uid), {
        email,
        uid: user.uid,
        favorites: [], // Initialize with an empty array
      });

      alert("Sign-Up Successful!");
      navigate("/"); // Redirect to home page
    } catch (err) {
      setError(err.message);
    }
  };

    // Navigate back to home page
    const handleBackToHome = () => {
      navigate("/");
    };

  return (
    <div className="signup-page">
      <button className="menu-button" onClick={handleBackToHome}>
        Back to Home
      </button>
      <form onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
