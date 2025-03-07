import React from 'react';
/**
 * SearchBar Component
 * -------------------
 * This component provides a search input for filtering and selecting cryptocurrencies.
 * 
 * Props:
 * - `searchTerm`: The current value of the search input field.
 * - `filteredCryptos`: An array of matching cryptocurrency names based on user input.
 * - `handleSearchChange`: Function to update the search term as the user types.
 * - `handleSearch`: Function to initiate the search when the button is clicked.
 * - `handleSearchSelect`: Function to handle selecting a cryptocurrency from the dropdown.
 */
const SearchBar = ({ searchTerm, filteredCryptos, handleSearchChange, handleSearch, handleSearchSelect }) => {
  return (
    <div className="search-container">
      <input 
        type="text"
        className="search-input"
        placeholder="Search for a cryptocurrency..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button className="search-button" onClick={handleSearch}>Search</button>
      
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
  );
};

export default SearchBar;
