import React from "react";
import { AuthGuard } from "./components/auth-guard";
interface ProductLayoutProps {
  children: React.ReactNode;
}

async function ProductLayout({ children }: ProductLayoutProps) {
  return (
    <>
      <AuthGuard>{children}</AuthGuard>
    </>
  );
}

export default ProductLayout;
