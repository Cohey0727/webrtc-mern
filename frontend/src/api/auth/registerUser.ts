type RegisterUserParams = {};

const registerUser = async (params: RegisterUserParams) => {
  return await fetch("http://localhost:8000/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export type { RegisterUserParams };
export default registerUser;
