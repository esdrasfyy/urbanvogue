import React from "react";
interface ProductLayoutProps {
  children: React.ReactNode;
}

async function ProductLayout({ children }: ProductLayoutProps) {
  return (
    <>
      {" "}
      <head>
        <title>Login - Urban Vogue</title>
        <meta property="og:title" content="Login - Urban Vogue" />
        <meta
          name="description"
          content="Log in and run to take advantage of all the opportunities in our store!"
        />
        <meta
          property="og:description"
          content="Log in and run to take advantage of all the opportunities in our store!"
        />
      </head>
      {children}
    </>
  );
}

export default ProductLayout;
