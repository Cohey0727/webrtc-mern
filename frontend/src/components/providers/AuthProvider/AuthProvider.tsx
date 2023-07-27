"use client";
import { LoginParams, getAccessToken, login, logout } from "@/api";
import { jwtDecode } from "@/utils";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

type AuthContextType = {
  accessToken: string | null;
  userId: string | null;

  logout: () => Promise<void>;
  login: (params: LoginParams) => Promise<void>;
  refreshToken: () => Promise<void>;
};

type TokenPayload = {
  userId: string;
  iat: number;
  exp: number;
};

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  userId: null,

  logout: () => Promise.resolve(),
  login: () => Promise.resolve(),
  refreshToken: () => Promise.resolve(),
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

  const handleLogin = useCallback(async (params: LoginParams) => {
    const { accessToken } = await login(params);
    setAccessToken(accessToken);
  }, []);

  const handleRefresh = useCallback(async () => {
    const { accessToken } = await getAccessToken();
    setAccessToken(accessToken);
  }, []);

  const userId = useMemo(() => {
    // jwt decode
    if (!accessToken) return null;
    return jwtDecode<TokenPayload>(accessToken).userId;
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        userId,
        logout: handleLogout,
        login: handleLogin,
        refreshToken: handleRefresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  return useContext(AuthContext);
}

export { useAuth };
export default AuthProvider;
