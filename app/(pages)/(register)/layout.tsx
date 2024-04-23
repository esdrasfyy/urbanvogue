import React from "react";
interface LoginLayoutProps {
  children: React.ReactNode;
}

async function RegisterLayout({ children }: LoginLayoutProps) {
  return (
    <>
      <head>
        <title>Register - Urban Vogue</title>
        <meta property="og:title" content="Register - Urban Vogue" />
        <meta
          name="description"
          content="Register and run to take advantage of all the opportunities in our store!"
        />
        <meta
          property="og:description"
          content="Register and run to take advantage of all the opportunities in our store!"
        />
      </head>
      {children}
    </>
  );
}

export default RegisterLayout;
