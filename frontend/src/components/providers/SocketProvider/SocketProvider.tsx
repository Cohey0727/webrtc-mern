"use client";
import { createContext, useCallback, useContext, useState } from "react";
import { getSocket } from "@/utils";
import { Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket;
  refresh: () => void;
};

const SocketContext = createContext<SocketContextType>({} as SocketContextType);

type SocketProviderProps = {
  children: React.ReactNode;
};

const SocketProvider: React.FC<SocketProviderProps> = (props) => {
  const { children } = props;
  const [socket, setSocket] = useState<Socket>(() => getSocket());
  const refresh = useCallback(() => {
    setSocket(getSocket());
  }, []);
  return <SocketContext.Provider value={{ socket, refresh }}>{children}</SocketContext.Provider>;
};

const useSocket = () => {
  return useContext(SocketContext);
};

export type { SocketProviderProps };
export { useSocket };
export default SocketProvider;
