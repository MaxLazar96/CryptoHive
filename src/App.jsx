//components import
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProfilePage from "./pages/ProfilePage";
import SearchResultsPage from "./pages/SearchResultsPage"; // Import the search page
import Footer from "./components/footer"; // Import Footer

/**
 * App Component
 * -------------
 * This is the main application component that sets up routing for the CryptoHive website.
 * 
 * Features:
 * - Uses React Router to handle different pages in the application.
 * - Wraps all routes within a `Layout` component for consistent styling and structure.
 * - Includes a `Footer` component that appears on all pages.
 */
const App = () => {
  return (
    <Router>
      <div className="app">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
        </Routes>
      </Layout>
        <Footer /> 
      </div>
    </Router>
  );
};

export default App;
