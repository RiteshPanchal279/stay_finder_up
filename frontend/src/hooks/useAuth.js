import { useState, useEffect } from "react";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    setIsLoggedIn(!!token);
    setUserRole(role);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return { isLoggedIn, userRole, logout };
}