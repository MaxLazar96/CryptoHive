import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import SearchComponent from "../components/SearchComponent"; // Import Search Component
import NewsList from "../components/NewsList"; // Import NewsList Component
import RunningBanner from "../components/RunningBanner"; // Import Running Banner
import "../styles/HomePage.css";
/**
 * HomePage Component
 * ------------------
 * This component serves as the main landing page for CryptoHive.
 * 
 * Features:
 * - Displays a running banner with top cryptocurrencies.
 * - Provides a search bar to look up cryptocurrencies.
 * - Fetches and displays cryptocurrency news.
 * - Retrieves user's favorite cryptocurrencies from Firestore.
 * - Allows filtering news based on selected categories and favorites.
 */
const HomePage = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [user, setUser] = useState(null); // Stores authenticated user
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login status
  const [cryptos, setCryptos] = useState([]); // Stores cryptocurrency list
  const [news, setNews] = useState([]); // Stores fetched news articles
  const [loading, setLoading] = useState(false); // Controls loading state
  const [error, setError] = useState(null); // Stores error messages
  const [userFavorites, setUserFavorites] = useState([]); // Add user favorites state
  const [selectedCategory, setSelectedCategory] = useState("all"); // Add category state

  /**
   * Effect Hook: Monitors Firebase authentication state.
   * - If a user is logged in, fetch their favorites from Firestore.
   */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsLoggedIn(true);
        fetchUserFavorites(currentUser.uid); // Fetch user favorites on login
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe(); // Cleanup function to prevent memory leaks
  }, []);

  // Fetch user's favorite cryptocurrencies from Firestore
  const fetchUserFavorites = async (uid) => {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      setUserFavorites(userDoc.data().favorites || []);
    }
  };

  /**
   * Effect Hook: Fetches the list of all available cryptocurrencies.
   * - Calls CryptoCompare API and extracts cryptocurrency names.
   */
  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/all/coinlist?api_key=e084bcc89f0bf7339cebbc2c3c3ae2bd80cf3e0fbf3b1d89301c17f20e231c1c`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const cryptoNames = Object.values(data.Data).map((coin) => coin.CoinName);
        setCryptos(cryptoNames);
      } catch (error) {
        console.error("Error fetching cryptocurrency list:", error);
      }
    };

    fetchCryptos();
  }, []);

  /**
   * Effect Hook: Fetches cryptocurrency news based on the selected category and user favorites.
   * - Calls CryptoCompare News API.
   * - If the user has favorites, filters news to include articles related to their selected cryptos.
   */
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        const category = selectedCategory === "all" ? "" : selectedCategory;
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/v2/news/?categories=${category}&api_key=e084bcc89f0bf7339cebbc2c3c3ae2bd80cf3e0fbf3b1d89301c17f20e231c1c`
        );
        const data = await response.json();

        let fetchedNews = data.Data || [];

        // Filter the news based on the user's selected favorite cryptos
        if (userFavorites.length > 0) {
          fetchedNews = fetchedNews.filter((article) =>
            userFavorites.some((crypto) =>
              article.title.toLowerCase().includes(crypto.toLowerCase())
            )
          );
        }

        setNews(fetchedNews);
      } catch (err) {
        console.error("Error fetching news:", err.message);
        setError("Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [selectedCategory, userFavorites]); // Re-fetch news when category or favorites change

  return (
    <div className="home-container">
      {/* Add Running Banner */}
      <RunningBanner />

      <main className="main-content">
        <section className="header-section">
          <img src="/logo.png" alt="CryptoHive Logo" className="logo" />
          <h1 className="site-title">CryptoHive</h1>
          <p className="site-description">Your gateway to the latest cryptocurrency news, trends, and updates from top sources.</p>
          <SearchComponent cryptos={cryptos} />

          {/* Bee Animation under the search bar */}
          {loading && (
            <div className="bee-animation-container">
              <img src="/bee.jpg" alt="Bee Animation" className="bee" />
            </div>
          )}
        </section>

        {/* Use NewsList component for displaying news */}
        <NewsList news={news} loading={loading} error={error} />
      </main>
    </div>
  );
};

export default HomePage;
