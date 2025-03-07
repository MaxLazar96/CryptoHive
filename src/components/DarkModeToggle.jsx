import React from "react";
import "../styles/DarkModeToggle.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

/**
 * DarkModeToggle Component
 * ------------------------
 * This component provides a toggle switch for enabling and disabling dark mode.
 * It takes two props:
 * - `darkMode`: A boolean indicating whether dark mode is currently enabled.
 * - `setDarkMode`: A function to update the dark mode state.
 * 
 * The toggle switch consists of:
 * - A checkbox input that controls dark mode state.
 * - A label that includes icons for the moon (dark mode) and sun (light mode).
 * - A moving ball indicator for visual feedback.
 */

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <div className="dark-mode-toggle">
      <input
        type="checkbox"
        className="checkbox"
        id="checkbox"
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
      />
      <label htmlFor="checkbox" className="checkbox-label">
        <i className="fa-solid fa-moon"></i>
        <i className="fa-solid fa-sun"></i>
        <span className="ball"></span>
      </label>
    </div>
  );
};

export default DarkModeToggle;
