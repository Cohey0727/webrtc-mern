import { apiConfig } from "@/configs";
import { io } from "socket.io-client";

const getSocket = (token: string) => {
  const domain = apiConfig.domain;
  return io(domain, {
    auth: { token },
  });
};

export { getSocket };
