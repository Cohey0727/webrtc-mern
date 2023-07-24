import { apiConfig } from "@/configs";

type RegisterUserParams = {};

const url = `${apiConfig.url}/api/v1/auth/register`;

const registerUser = async (params: RegisterUserParams) => {
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export type { RegisterUserParams };
export default registerUser;
