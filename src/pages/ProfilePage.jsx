import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "../styles/ProfilePage.css";
import { useNavigate } from "react-router-dom";
import useCryptoLogos from "../components/useCryptoLogos";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [saveStatus, setSaveStatus] = useState("");

  const navigate = useNavigate();

  const availableCryptos = [
    "Bitcoin", "Ethereum", "Binance Coin", "Tether", "USD Coin",
    "Ripple", "Cardano", "Solana", "Dogecoin", "Polkadot",
    "Uniswap", "Litecoin", "Chainlink", "Bitcoin Cash", "Avalanche",
    "Polygon", "Stellar", "VeChain", "TRON", "Filecoin",
    "Ethereum Classic", "Algorand", "Tezos", "Cosmos", "Monero",
    "EOS", "Zcash", "Shiba Inu", "Aave", "IOTA", "Maker"
  ];

  const { cryptoLogos, loading } = useCryptoLogos(availableCryptos);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;
      try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setFavorites(userDoc.data().favorites || []);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [user]);

  const handleFavoriteChange = (selectedCrypto) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(selectedCrypto)
        ? prevFavorites.filter((fav) => fav !== selectedCrypto)
        : [...prevFavorites, selectedCrypto]
    );
  };

  const handleSaveFavorites = async () => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      try {
        await setDoc(userRef, { favorites }, { merge: true });
        setSaveStatus("Favorites Saved!");
        setTimeout(() => setSaveStatus(""), 2000);
      } catch (error) {
        console.error("Error saving favorites:", error);
        setSaveStatus("Error saving favorites, please try again.");
      }
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="profile-page">
      <h2>Welcome, {user?.email.split("@")[0]}! Here’s your profile.</h2>
      {user ? (
        <div>
          <button className="menu-button" onClick={handleBackToHome}>
            Back to Home
          </button>
          <p><strong>Email:</strong> {user.email}</p>
          <h3>Choose Your Favorite Cryptos:</h3>
          <div className="crypto-grid">
            {availableCryptos.map((crypto) => (
              <label
                key={crypto}
                className={`crypto-item ${favorites.includes(crypto) ? "selected" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleFavoriteChange(crypto);
                }}
              >
                <img
                  src={cryptoLogos[crypto] || "/bee.jpg"}
                  alt={crypto}
                  className="crypto-logo"
                  onError={(e) => { e.target.src = "/bee.jpg"; }}
                />
                <span>{crypto}</span>
              </label>
            ))}
          </div>
          {saveStatus && <p className="save-status">{saveStatus}</p>}
          <button onClick={handleSaveFavorites}>Save Favorites</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
