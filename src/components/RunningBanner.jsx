import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios for API requests
import "../styles/RunningBanner.css"; // Import CSS for styling

/**
 * RunningBanner Component
 * -----------------------
 * This component displays a running banner with real-time cryptocurrency price updates.
 * It fetches the top 10 cryptocurrencies by total volume using the CryptoCompare API.
 * 
 * State:
 * - `cryptoData`: An array containing the fetched cryptocurrency data, including:
 *   - `name`: The full name of the cryptocurrency.
 *   - `price`: The latest price in USD.
 *   - `change`: The percentage change in the last 24 hours.
 * 
 * API:
 * - The component fetches data from CryptoCompare's API.
 * - Data is retrieved using Axios and updated in the component state.
 * 
 * Styling:
 * - Uses `RunningBanner.css` for animation and display effects.
 */
const RunningBanner = () => {
  // State to store the fetched cryptocurrency data
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Effect Hook: Fetches cryptocurrency data from the API on component mount.
   * - Calls the CryptoCompare API to retrieve top 10 cryptocurrencies.
   * - Extracts relevant details (name, price, 24-hour percentage change).
   * - Handles errors if the request fails.
   */
  useEffect(() => {
    const fetchCryptoData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://min-api.cryptocompare.com/data/top/totalvolfull",
          {
            params: {
              limit: 10, // Number of top cryptocurrencies to fetch
              tsym: "USD", // Prices in USD
              api_key: "8bb2137b2ae34650d6e4b802560ccc47aea05dffaea5018a163fe437b3b54060", // Replace with your API key
            },
          }
        );
        // Extract relevant data and format price & percentage change
        const data = response.data.Data.map((crypto) => ({
          name: crypto.CoinInfo.FullName,
          price: parseFloat(crypto.RAW.USD.PRICE).toFixed(2),
          change: parseFloat(crypto.RAW.USD.CHANGEPCT24HOUR).toFixed(2),
        }));

        setCryptoData(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching crypto data:", error); // Handle API request errors
      } finally {
        setLoading(false); // Set loading to false after fetching (or on error)
      }
    };

    fetchCryptoData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="running-banner">
      <div className="running-banner-content">
        {/* Show loading message while fetching data */}
        {loading ? (
          <div className="loading-message">Loading realtime cryptocurrency data...</div>
        ) : (
          // Render the crypto data once it's available
          cryptoData.map((crypto, index) => (
            <span key={index} className="banner-crypto-item">
              <strong>{crypto.name}</strong>: ${crypto.price} (
              {crypto.change > 0 ? "+" : ""}
              {crypto.change}%)
            </span>
          ))
        )}
      </div>
    </div>
  );  
};

export default RunningBanner;
