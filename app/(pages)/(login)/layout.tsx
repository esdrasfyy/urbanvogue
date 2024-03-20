import React from "react";

interface LoginLayoutProps {
  children: React.ReactNode;
}

async function LoginLayout({ children }: LoginLayoutProps) {
  return <>{children}</>
}

export default LoginLayout;
