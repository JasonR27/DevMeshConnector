import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaMoon, FaSun } from "react-icons/fa";

const ColorModeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleColorMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("bg-dark", !isDarkMode);
    document.body.classList.toggle("text-white", !isDarkMode);
  };

  return (
    <button
      className="btn btn-outline-secondary"
      onClick={toggleColorMode}
    >
      {isDarkMode ? <FaSun /> : <FaMoon />} Switch to {isDarkMode ? "light" : "dark"} mode
    </button>
  );
};

export default ColorModeSwitcher;
