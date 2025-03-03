import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import PropTypes from "prop-types";
import Loading from "../utils/Loading";

// pertenece a config de firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsuscribe;
  }, []);

  if (user === false) return <Loading />;

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUserContext = () => useContext(UserContext);
