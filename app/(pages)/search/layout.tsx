import React from "react";
interface SearchLayoutProps {
  children: React.ReactNode;
}

async function SearchLayout({ children }: SearchLayoutProps) {
  return <>{children}</>;
}

export default SearchLayout;
