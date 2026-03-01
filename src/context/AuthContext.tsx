"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { User, Plan, AuthState, LoginCredentials, SignupCredentials } from "@/types";
import { generateId, isValidEmail, isValidPassword } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Mock user database (persisted to localStorage key: "saas_users")
// ---------------------------------------------------------------------------
const USERS_KEY = "saas_users";
const SESSION_KEY = "saas_session";

function loadUsers(): Record<string, User & { password: string }> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, User & { password: string }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loadSession(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function saveSession(user: User | null) {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

// ---------------------------------------------------------------------------
// Context shape
// ---------------------------------------------------------------------------
interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
  upgradeToPro: () => void;
  updateSettings: (name: string, company: string) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Rehydrate session on mount
  useEffect(() => {
    const sessionUser = loadSession();
    setState({ user: sessionUser, isAuthenticated: !!sessionUser, isLoading: false });
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const { email, password } = credentials;

    if (!isValidEmail(email)) throw new Error("Invalid email address.");
    if (!isValidPassword(password)) throw new Error("Password must be at least 8 characters.");

    const users = loadUsers();
    const match = Object.values(users).find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!match) throw new Error("Invalid email or password.");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pw, ...user } = match;
    saveSession(user);
    setState({ user, isAuthenticated: true, isLoading: false });
  }, []);

  const signup = useCallback(async (credentials: SignupCredentials) => {
    const { email, password, confirmPassword } = credentials;

    if (!isValidEmail(email)) throw new Error("Invalid email address.");
    if (!isValidPassword(password)) throw new Error("Password must be at least 8 characters.");
    if (password !== confirmPassword) throw new Error("Passwords do not match.");

    const users = loadUsers();
    const exists = Object.values(users).some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) throw new Error("An account with this email already exists.");

    const newUser: User & { password: string } = {
      id: generateId(),
      email,
      name: "",
      company: "",
      plan: "free",
      createdAt: new Date().toISOString(),
      password,
    };

    users[newUser.id] = newUser;
    saveUsers(users);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pw, ...user } = newUser;
    saveSession(user);
    setState({ user, isAuthenticated: true, isLoading: false });
  }, []);

  const logout = useCallback(() => {
    saveSession(null);
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  const upgradeToPro = useCallback(() => {
    setState((prev) => {
      if (!prev.user) return prev;
      const updated: User = { ...prev.user, plan: "pro" as Plan };

      // Persist to both session and user store
      saveSession(updated);
      const users = loadUsers();
      if (users[updated.id]) {
        users[updated.id] = { ...users[updated.id], plan: "pro" };
        saveUsers(users);
      }

      return { ...prev, user: updated };
    });
  }, []);

  const updateSettings = useCallback((name: string, company: string) => {
    setState((prev) => {
      if (!prev.user) return prev;
      const updated: User = { ...prev.user, name, company };

      saveSession(updated);
      const users = loadUsers();
      if (users[updated.id]) {
        users[updated.id] = { ...users[updated.id], name, company };
        saveUsers(users);
      }

      return { ...prev, user: updated };
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, login, signup, logout, upgradeToPro, updateSettings }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
