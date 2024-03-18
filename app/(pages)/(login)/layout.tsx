import { DontHaveLogin } from "@/components/dont-have-login";
import React from "react";

interface LoginLayoutProps {
  children: React.ReactNode;
}

async function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <>
      <DontHaveLogin
        route="/account"
        children={children}
      />
    </>
  );
}

export default LoginLayout;
