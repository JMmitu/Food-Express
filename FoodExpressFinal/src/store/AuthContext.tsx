import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import api from "../services/api";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (name: string, email: string, password: string) => Promise<AuthUser>;
  logout: () => void;
  updateUser: (user: AuthUser) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUser(): AuthUser | null {
  try {
    const stored = localStorage.getItem("user");
    return stored ? (JSON.parse(stored) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Hydrated synchronously (lazy initializer) so there's no loading flicker
  // and no setState-in-effect on mount.
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    return data.user as AuthUser;
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      return data.user as AuthUser;
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, []);

  const updateUser = useCallback((updated: AuthUser) => {
    localStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
