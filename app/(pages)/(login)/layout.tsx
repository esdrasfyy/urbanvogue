import React from "react";

interface LoginLayoutProps {
  children: React.ReactNode;
}

async function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <>
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

export default LoginLayout;
