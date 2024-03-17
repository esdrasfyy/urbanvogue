import React from "react";

interface ProductLayoutProps {
  children: React.ReactNode;
}

function AuthGuard({ children }: ProductLayoutProps) {
  console.log("passou pelo children auth");

  return <>{children};</>;
}

export { AuthGuard };
