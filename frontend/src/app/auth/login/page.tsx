"use client";
import { LoginResponse } from "@/api";
import { Center, LoginForm, Page } from "@/components";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

function Login() {
  const router = useRouter();
  const handleSubmitSuccess = useCallback(
    (res: LoginResponse) => {
      router.push("/");
    },
    [router],
  );
  return (
    <Page>
      <Center>
        <LoginForm onSubmitSuccess={handleSubmitSuccess} />
      </Center>
    </Page>
  );
}

export default Login;
