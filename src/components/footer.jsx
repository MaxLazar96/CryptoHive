import React from "react";
import "../styles/Footer.css"; // Make sure to create and style the Footer.css file.

/**
 * Footer Component
 * ----------------
 * This component renders the footer section of the CryptoHive website.
 * It includes:
 * - A `footer` element containing copyright information.
 * - Dynamically displays the current year using `new Date().getFullYear()`.
 * 
 * Styling is applied from the `Footer.css` file.
 */

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} CryptoHive. All Rights Reserved.</p>
    </footer>
    
  );
};

export default Footer;