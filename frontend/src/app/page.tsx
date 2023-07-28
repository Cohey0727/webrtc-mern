"use client";
import { Loading, withAuthGuard } from "@/components";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// このページはログインしていると、自動的に/homeにリダイレクトされる
// ログインしていないと、/auth/loginにリダイレクトされる
function Root() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/home");
  }, [router]);

  return <Loading />;
}

export default withAuthGuard(Root);
