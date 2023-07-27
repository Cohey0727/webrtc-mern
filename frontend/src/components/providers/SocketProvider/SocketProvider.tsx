"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getSocket } from "@/utils";
import { Socket } from "socket.io-client";
import { useAuth } from "../AuthProvider";

type SocketContextType = {
  socket: Socket | null;
};

const SocketContext = createContext<SocketContextType>({} as SocketContextType);

type SocketProviderProps = {
  children: React.ReactNode;
};

// AuthProviderに依存しているので、AuthProviderの後にSocketProviderを配置する必要がある
const SocketProvider: React.FC<SocketProviderProps> = (props) => {
  const { accessToken } = useAuth();
  const { children } = props;
  const socket = useMemo(() => {
    return accessToken ? getSocket(accessToken) : null;
  }, [accessToken]);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

const useSocket = () => {
  return useContext(SocketContext);
};

export type { SocketProviderProps };
export { useSocket };
export default SocketProvider;
