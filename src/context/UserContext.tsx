import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../shared/components/Loading";
import { auth } from "../services/firebase";

type UserContextValue = {
  user: FirebaseUser | null;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

type UserContextProviderProps = {
  children: ReactNode;
};

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [user, setUser] = useState<FirebaseUser | null | false>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
    });

    return unsubscribe;
  }, []);

  if (user === false) {
    return <Loading />;
  }

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
}

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
};
