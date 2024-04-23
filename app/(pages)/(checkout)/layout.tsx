import React from "react";

export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
  <head>
  <title>Checkout Order - Urban Vogue</title>
        <meta property="og:title" content="Checkout Order - Urban Vogue" />
        <meta
          name="description"
          content="Complete the last steps to make your purchase and stay fashionable!"
        />
        <meta
          property="og:description"
          content="Complete the last steps to make your purchase and stay fashionable!"
        />
    </head>
    {children}</>
}