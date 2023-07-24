import { apiConfig } from "@/configs";

type LoginParams = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  user: {
    _id: string;
    name: string;
    email: string;
    picture: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
};

const url = `${apiConfig.url}/api/v1/auth/login`;

const login = async (params: LoginParams) => {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res.json()) as LoginResponse;
};

export type { LoginParams, LoginResponse };
export default login;
