import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
/**
 * SearchComponent
 * ---------------
 * This component provides a search bar for finding cryptocurrencies.
 * 
 * Features:
 * - Live filtering: Displays a dropdown with matching cryptocurrency names.
 * - Search functionality: Navigates to a search results page when triggered.
 * - Bee animation: Displays a bee animation while searching.
 * - Handles both manual searches and dropdown selections.
 * 
 * Props:
 * - `cryptos`: An optional array of cryptocurrency names to filter from.
 */
const SearchComponent = ({ cryptos = [] }) => {
  const navigate = useNavigate(); // Hook for navigation
  const [searchTerm, setSearchTerm] = useState(""); // Stores the user’s search input
  const [filteredCryptos, setFilteredCryptos] = useState([]); // Stores filtered cryptocurrency suggestions
  const [loading, setLoading] = useState(false); // Controls the loading animation state

  /**
   * Handles changes in the search input field.
   * - Updates `searchTerm` state with user input.
   * - Filters `cryptos` to find matches based on the input.
   * - Limits dropdown suggestions to 10 items.
   */
  const handleSearchChange = (e) => {
    const input = e.target.value;
    setSearchTerm(input);

    if (input && cryptos.length > 0) {
      const matches = cryptos.filter((crypto) =>
        crypto.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredCryptos(matches.slice(0, 10)); // Show only top 10 matches
    } else {
      setFilteredCryptos([]); // Clear suggestions if input is empty
    }
  };

  /**
   * Handles the search button click.
   * - Shows a loading animation before navigating.
   * - Redirects the user to a search results page.
   */
  const handleSearch = () => {
    if (searchTerm) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate(`/search?crypto=${searchTerm}`); // Navigate with search query
      }, 2000); // Simulates loading delay
    } else {
      alert("Please enter a cryptocurrency to search.");
    }
  };

  /**
   * Handles selecting a cryptocurrency from the dropdown.
   * - Sets the selected crypto as the search term.
   * - Clears the dropdown list.
   */
  const handleSearchSelect = (crypto) => {
    setSearchTerm(crypto);
    setFilteredCryptos([]); // Clear the dropdown
  };

  return (
    <div className="search-container">
      {/* Search Bar and Dropdown Wrapper */}
      <div className="search-bar-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a cryptocurrency..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>

        {/* Dropdown for suggestions */}
        {filteredCryptos.length > 0 && (
          <ul className="dropdown-menu">
            {filteredCryptos.map((crypto, index) => (
              <li
                key={index}
                className="dropdown-item"
                onClick={() => handleSearchSelect(crypto)}
              >
                {crypto}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bee Animation */}
      {loading && (
        <div className="bee-animation-container">
          <img src="/bee.jpg" alt="Bee Animation" className="bee" />
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
