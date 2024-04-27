import React from "react";

export default async function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
  <head>
  <title>Account orders - Urban Vogue</title>
        <meta property="og:title" content="Account orders  - Urban Vogue" />
        <meta
          name="description"
          content="Check all your latest orders!"
        />
        <meta
          property="og:description"
          content="Check all your latest orders!"
        />
  </head>
  {children} 
  </>;
}