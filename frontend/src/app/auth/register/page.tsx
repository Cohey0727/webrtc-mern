"use client";
import { Center, Page, RegisterForm } from "@/components";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

function Register() {
  const router = useRouter();
  const handleSubmitSuccess = useCallback(() => {
    router.push("/");
  }, [router]);
  return (
    <Page>
      <Center>
        <RegisterForm onSubmitSuccess={handleSubmitSuccess} />
      </Center>
    </Page>
  );
}

export default Register;
