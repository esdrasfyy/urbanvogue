import React from "react";
interface LoginLayoutProps {
  children: React.ReactNode;
}

async function RegisterLayout({ children }: LoginLayoutProps) {

  return <>{children}</>;
}

export default RegisterLayout;