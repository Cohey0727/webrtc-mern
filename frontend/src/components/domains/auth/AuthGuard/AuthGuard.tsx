"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAccessToken } from "@/api";
import Loading from "../../../feedbacks/Loading";
import { useAuth } from "../../../providers/AuthProvider";
import { urlStringify } from "@/utils";

type AuthGuardProps = {
  children: React.ReactNode;
  loadingElement: React.ReactNode;
};

const AuthGuard: React.FC<AuthGuardProps> = (props) => {
  const { children, loadingElement } = props;
  const router = useRouter();
  const pathname = usePathname();
  const [isInitial, setInitial] = useState(true);
  const { accessToken, setAccessToken } = useAuth();
  useEffect(() => {
    if (isInitial) {
      getAccessToken()
        .then(({ accessToken }) => {
          setAccessToken(accessToken);
        })
        .finally(() => {
          setInitial(false);
        });
    } else if (!accessToken) {
      const currentUrl = urlStringify({ pathname });
      router.push(
        urlStringify({
          pathname: "/auth/login",
          search: { callback: currentUrl },
        }),
      );
    }
  }, [isInitial, accessToken, router, setAccessToken, pathname]);

  if (accessToken === null) {
    return loadingElement;
  }
  return children;
};

function withAuthGuard<P>(Component: React.ComponentType<P>): React.ComponentType<P> {
  return function AuthGuardContainer(props: any) {
    return (
      <AuthGuard loadingElement={<Loading />}>
        <Component {...props} />
      </AuthGuard>
    );
  };
}

export type { AuthGuardProps };
export { withAuthGuard };
export default AuthGuard;
