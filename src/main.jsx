import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
/**
 * Index File
 * ----------
 * This is the entry point of the CryptoHive application.
 * 
 * Features:
 * - Uses `ReactDOM.createRoot` to render the app in `StrictMode` for highlighting potential issues.
 * - Wraps the entire application inside `<React.StrictMode>` for additional debugging and warnings.
 * - Imports global styles from `index.css`.
 */
// Render the root application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
