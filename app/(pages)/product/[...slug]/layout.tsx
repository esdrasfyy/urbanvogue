import React from "react";
interface ProductLayoutProps {
  children: React.ReactNode;
}

async function ProductLayout({ children }: ProductLayoutProps) {
  return (
    <>
      {children}
    </>
  );
}

export default ProductLayout;
