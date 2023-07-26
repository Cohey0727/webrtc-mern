import { apiConfig } from "@/configs";
import { io } from "socket.io-client";

const getSocket = () => {
  const domain = apiConfig.domain;
  return io(domain);
};

export { getSocket };
