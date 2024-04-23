import React from "react";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <head>
        <title>Account - Urban Vogue</title>
        <meta property="og:title" content="Account - Urban Vogue" />
        <meta
          name="description"
          content="This page is personalized especially for the user, find what you need regarding your account here!"
        />
        <meta
          property="og:description"
          content="This page is personalized especially for the user, find what you need regarding your account here!"
        />
      </head>
      {children}
    </>
  );
}
