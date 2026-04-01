import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [darkMode, setDarkMode] = useState(false);

  // ✅ Load user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }

    // 🔥 Load dark mode preference
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }

    setLoading(false);
  }, []);

  // ✅ Login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // 🔥 Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newValue = !prev;

      localStorage.setItem("darkMode", newValue);

      if (newValue) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }

      return newValue;
    });
  };

  return (
    <AuthContext.Provider 
      value={{ user, login, logout, loading, darkMode, toggleDarkMode }}
    >
      {children}
    </AuthContext.Provider>
  );
};