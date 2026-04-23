'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, getStoredUser, persistUser, clearUser } from '@/lib/auth';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(getStoredUser());
    setIsLoading(false);
  }, []);

  async function login(email: string, _password: string) {
    const existing = getStoredUser();
    const authed: User =
      existing?.email === email
        ? existing
        : { id: crypto.randomUUID(), email, name: email.split('@')[0] };
    persistUser(authed);
    setUser(authed);
  }

  async function signup(email: string, name: string, _password: string) {
    const newUser: User = { id: crypto.randomUUID(), email, name };
    persistUser(newUser);
    setUser(newUser);
  }

  function logout() {
    clearUser();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
