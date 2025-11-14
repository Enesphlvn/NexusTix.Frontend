import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { LoginRequest } from "../models/Auth/Requests/LoginRequest";
import * as authService from "../api/Auth/authService";

interface AuthUser {
  email: string;
  fullName: string;
  roles: string[];
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (request: LoginRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("nexusTixToken");
    const storedUser = localStorage.getItem("nexusTixUser");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser) as AuthUser);
    }
    setLoading(false);
  }, []);

  const login = async (request: LoginRequest) => {
    try {
      const response = await authService.login(request);

      const authUser: AuthUser = {
        email: response.email,
        fullName: `${response.firstName} ${response.lastName}`,
        roles: response.roles,
      };

      setToken(response.token);
      setUser(authUser);

      localStorage.setItem("nexusTixToken", response.token);
      localStorage.setItem("nexusTixUser", JSON.stringify(authUser));
    } catch (error) {
      console.error("AuthContext Login Hatası:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("nexusTixToken");
    localStorage.removeItem("nexusTixUser");
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth, AuthProvider içinde kullanılmalıdır");
  }
  return context;
};
