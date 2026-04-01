import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {

  const { user, darkMode, toggleDarkMode } = useContext(AuthContext);

  return (
    <div className="navbar">

      {/* CENTER TITLE */}
      <h3 className="nav-center">SMART DEADLINE TRACKER</h3>

      {/* RIGHT SIDE */}
      <div className="nav-right">

        {/* 🌙 DARK MODE TOGGLE */}
        <button onClick={toggleDarkMode} className="theme-toggle">
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* USER */}
        <div className="user">
          <FaUserCircle />
          <span>{user?.username}</span>
        </div>

      </div>

    </div>
  );
}

export default Navbar;