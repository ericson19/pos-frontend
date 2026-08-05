import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("user") ? true : false,
  );
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  );
  const API_URL = import.meta.env.VITE_APP_API_URL;

  // Login function
  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout function
  const logout = async () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user");
    try {
      const response = await axios.post(
        `${API_URL}/users/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      console.log("Logout response:", response);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
