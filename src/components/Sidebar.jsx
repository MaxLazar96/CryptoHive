import React from "react";
import { useNavigate } from "react-router-dom"; // React Router hook for navigation
import "../styles/Sidebar.css";
/**
 * Sidebar Component
 * -----------------
 * This component displays a sidebar with a list of predefined popular cryptocurrencies.
 * Clicking on a cryptocurrency name navigates to the search results for that crypto.
 *
 * Props:
 * - `predefinedCryptos`: An array of popular cryptocurrency names to display in the sidebar.
 */
const Sidebar = ({ predefinedCryptos }) => {
  const navigate = useNavigate();

  /**
   * Handles clicking on a cryptocurrency link.
   * - Navigates to the search results page with the selected cryptocurrency.
   */
  const handleOptionClick = (crypto) => {
    navigate(`/search?crypto=${crypto}`); // Navigate with the selected cryptocurrency
  };

  return (
    <div className="sidebar">
      
      <h3>Popular Cryptos</h3>
      {predefinedCryptos.map((crypto, index) => (
        <a
          key={index}
          onClick={() => handleOptionClick(crypto)}
          className="sidebar-link"
        >
          {crypto}
        </a>
      ))}
    </div>
  );
};

export default Sidebar;
