import { apiConfig } from "@/configs";
import axios from "axios";

type GetAccessTokenResponse = {
  accessToken: string;
};

const url = `${apiConfig.url}/api/v1/auth/token`;

const getAccessToken = async () => {
  const res = await axios.post(
    url,
    {},
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return (await res.data) as GetAccessTokenResponse;
};

export type { GetAccessTokenResponse };
export default getAccessToken;
