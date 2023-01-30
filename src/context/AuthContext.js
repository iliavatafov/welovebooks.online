import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("user", {});

  const userLogin = (authData) => {
    setAuth(authData);
  };

  const userLogout = () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{
        user: auth,
        userLogin,
        userLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
