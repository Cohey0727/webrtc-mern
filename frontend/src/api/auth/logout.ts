import { apiConfig } from "@/configs";
import axios from "axios";

type LogoutResponse = {
  message: string;
};

const url = `${apiConfig.url}/api/v1/auth/logout`;

const logout = async () => {
  const res = await axios.post(url, null, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res.data) as LogoutResponse;
};

export type { LogoutResponse };
export default logout;
