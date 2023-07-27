"use client";
import { LoginResponse } from "@/api";
import { Center, LoginForm, Page, useAuth } from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmitSuccess = useCallback(() => {
    const callbackPath = searchParams.get("callback") ?? "/";
    router.push(callbackPath);
  }, [router, searchParams]);
  return (
    <Page>
      <Center>
        <LoginForm onSubmitSuccess={handleSubmitSuccess} />
      </Center>
    </Page>
  );
}

export default Login;
