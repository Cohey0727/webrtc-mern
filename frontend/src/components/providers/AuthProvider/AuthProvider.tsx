"use client";
import { logout } from "@/api";
import { jwtDecode } from "@/utils";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

type AuthContextType = {
  accessToken: string | null;
  userId: string | null;
  setAccessToken: (accessToken: string | null) => void;
  logout: () => Promise<void>;
};

type TokenPayload = {
  userId: string;
  iat: number;
  exp: number;
};

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  userId: null,
  setAccessToken: () => {},
  logout: () => Promise.resolve(),
});

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const handleLogout = useCallback(async () => {
    await logout();
    setAccessToken(null);
  }, []);

  const userId = useMemo(() => {
    // jwt decode
    if (!accessToken) return null;
    return jwtDecode<TokenPayload>(accessToken).userId;
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, userId, setAccessToken, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  return useContext(AuthContext);
}

export { useAuth };
export default AuthProvider;
