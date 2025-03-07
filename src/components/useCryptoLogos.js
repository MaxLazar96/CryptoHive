import { useState, useEffect } from "react";
import axios from "axios";
/**
 * Custom hook: useCryptoLogos
 * ---------------------------
 * Fetches cryptocurrency logos from CoinGecko as the primary source.
 * Falls back to CryptoCompare for missing logos.
 * Manually assigns missing logos where necessary.
 *
 * @param {Array} availableCryptos - List of cryptocurrency names to fetch logos for.
 * @returns {Object} { cryptoLogos, loading } - An object containing:
 *   - cryptoLogos: A dictionary of crypto names mapped to their logo URLs.
 *   - loading: Boolean indicating if the fetching process is still in progress.
 */
const useCryptoLogos = (availableCryptos) => {
  const [cryptoLogos, setCryptoLogos] = useState({}); // Stores fetched logos
  const [loading, setLoading] = useState(true); // Tracks loading state

  useEffect(() => {
    /**
     * Fetches crypto logos from CoinGecko, falls back to CryptoCompare,
     * and finally assigns manually provided logos if necessary.
     */
    const fetchCryptoLogos = async () => {
       try {
          // Fetch data from CoinGecko first
          const coingeckoResponse = await axios.get(
             "https://api.coingecko.com/api/v3/coins/markets",
             { params: { vs_currency: "usd", per_page: 100, page: 1 } }
          );
          // Store CoinGecko logos
          const newLogos = {};
          coingeckoResponse.data.forEach((coin) => {
             newLogos[coin.name] = coin.image; // Direct image URL
          });
 
          // Fallback for missing logos from CryptoCompare
          const missingCryptos = availableCryptos.filter(crypto => !newLogos[crypto]);
          if (missingCryptos.length > 0) {
             const cryptocompareResponse = await axios.get(
                "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD"
             );
             cryptocompareResponse.data.Data.forEach((coin) => {
                const fullName = coin.CoinInfo.FullName;
                if (missingCryptos.includes(fullName) && coin.CoinInfo.ImageUrl) {
                   newLogos[fullName] = `https://www.cryptocompare.com${coin.CoinInfo.ImageUrl}`;
                }
             });
          }
 
          // Manually add missing logos
          const manualLogos = {
             "VeChain": "https://cryptologos.cc/logos/vechain-vet-logo.png",
             "EOS": "https://cryptologos.cc/logos/eos-eos-logo.png",
             "IOTA": "https://cryptologos.cc/logos/iota-miota-logo.png",
             "Maker": "https://cryptologos.cc/logos/maker-mkr-logo.png",
             "Ripple": "https://cryptologos.cc/logos/xrp-xrp-logo.png",
            "Tezos": "https://cryptologos.cc/logos/tezos-xtz-logo.png",
            "Zcash": "https://cryptologos.cc/logos/zcash-zec-logo.png"
          };
          // Add manual logos if they were not found in APIs
          Object.keys(manualLogos).forEach(key => {
             if (!newLogos[key]) newLogos[key] = manualLogos[key];
          });
          //Update state with final set of crypto logos
          setCryptoLogos(newLogos);
       } catch (error) {
          console.error("Error fetching crypto logos:", error);
       }finally {
        setLoading(false); // Set loading to false once fetching is complete
      }
    };
 
    fetchCryptoLogos();
 }, []);
 

  return { cryptoLogos, loading };
};

export default useCryptoLogos;
