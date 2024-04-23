import React from "react";

export default async function EditProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
  <head>
  <title>Edit account - Urban Vogue</title>
        <meta property="og:title" content="Edit account - Urban Vogue" />
        <meta
          name="description"
          content="Designated space for editing user information!"
        />
        <meta
          property="og:description"
          content="Designated space for editing user information!"
        />
  </head>
  {children} 
  </>;
}