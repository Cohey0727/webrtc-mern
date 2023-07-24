"use client";
import { createContext, useContext, useState } from "react";

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  setAccessToken: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [accessToken, setAccessToken] = useState<string | null>(null);
  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>{children}</AuthContext.Provider>
  );
};

function useAuth() {
  return useContext(AuthContext);
}

export { useAuth };
export default AuthProvider;
