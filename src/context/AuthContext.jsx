import { createContext, useState, useEffect } from "react";
import { setAuthToken } from "../utils/api";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [token]);

  const login = (tk, usr) => {
    localStorage.setItem("token", tk);
    localStorage.setItem("user", JSON.stringify(usr));
    setToken(tk);
    setUser(usr);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    setAuthToken();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
