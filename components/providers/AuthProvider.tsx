"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { isAuthConfigured, tryGetFirebaseAuth } from "@/lib/firebase";

type AuthState = {
  user: User | null;
  /** false mientras Firebase resuelve la sesión persistida. */
  ready: boolean;
  configured: boolean;
};

const AuthContext = createContext<AuthState>({
  user: null,
  ready: true,
  configured: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(!isAuthConfigured);

  useEffect(() => {
    const auth = tryGetFirebaseAuth();

    if (!auth) {
      setReady(true);
      return;
    }

    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setReady(true);
    });
  }, []);

  const value = useMemo<AuthState>(
    () => ({ user, ready, configured: isAuthConfigured }),
    [user, ready]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
