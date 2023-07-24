import { apiConfig } from "@/configs";

type RegisterUserParams = {
  name: string;
  email: string;
  password: string;
};

type RegisterUserResponse = {
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

const url = `${apiConfig.url}/api/v1/auth/register`;

const registerUser = async (params: RegisterUserParams) => {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res.json()) as RegisterUserResponse;
};

export type { RegisterUserParams, RegisterUserResponse };
export default registerUser;
