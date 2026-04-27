import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setUser(decoded);
      } else {
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = decodeToken(token);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};