import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginUser, logoutUser } from "../services";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = useCallback(
    async (name: string, email: string) => {
      try {
        await loginUser(name, email);
        localStorage.setItem("isAuthenticated", "true");
        setIsAuthenticated(true);
        navigate("/search");
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    [navigate]
  );

  const logout = useCallback(async () => {
    try {
      await logoutUser();
      localStorage.removeItem("isAuthenticated");
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [navigate]);

  const authContextValue = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
