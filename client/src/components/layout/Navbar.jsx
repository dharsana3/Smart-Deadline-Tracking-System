import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaUserCircle, FaSun, FaMoon } from "react-icons/fa";

function Navbar() {

  const { user, darkMode, toggleDarkMode } = useContext(AuthContext);

  return (
    <div className="navbar">

      <h3 className="nav-center">SMART DEADLINE TRACKER</h3>

      <div className="nav-right">

        <button onClick={toggleDarkMode} className="theme-toggle">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <div className="user">
          <FaUserCircle />
          <span>{user?.username}</span>
        </div>

      </div>

    </div>
  );
}

export default Navbar;