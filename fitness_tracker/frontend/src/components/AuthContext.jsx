import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
  });

  const login = (user) => {
    setAuth({
      isAuthenticated: true,
      user: user,
    });
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
    });
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
