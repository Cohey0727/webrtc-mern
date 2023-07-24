import { apiConfig } from "@/configs";

type GetAccessTokenResponse = {
  accessToken: string;
};

const url = `${apiConfig.url}/api/v1/auth/register`;

const getAccessToken = async () => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res.json()) as GetAccessTokenResponse;
};

export type { GetAccessTokenResponse };
export default getAccessToken;
