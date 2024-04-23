import React from "react";

  export default async function ApproveLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <>
    <head>
    <title>Approve your payment - Urban Vogue</title>
        <meta property="og:title" content="Approve your Payment - Urban Vogue" />
        <meta
          name="description"
          content="Your payment order has been generated! Check details of this transaction."
        />
        <meta
          property="og:description"
          content="Your payment order has been generated! Check details of this transaction."
        />
    </head>
    {children}</>
  }