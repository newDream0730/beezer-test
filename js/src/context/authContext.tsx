import React, {createContext, useContext, useEffect, useState} from "react";
import firebase from "firebase/compat/app";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import nookies from "nookies";
import {auth} from "../config/firebase";

const AuthContext = createContext<{user: firebase.User | null}>({
  user: null,
});
export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({children}: any) {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  useEffect(() => {
    const auth = getAuth();
    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", {path: "/"});
        nookies.set(undefined, "uid", "", {path: "/"});
        setUserLoading(false);
      } else {
        const token = await user.getIdToken();
        setUser(user as firebase.User);
        nookies.set(undefined, "token", token, {path: "/"});
        nookies.set(undefined, "uid", user.uid, {path: "/"});
        setUserLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  const value = {user, userLoading};

  return (
    <AuthContext.Provider value={value}>
      {!userLoading && children}
    </AuthContext.Provider>
  );
}
