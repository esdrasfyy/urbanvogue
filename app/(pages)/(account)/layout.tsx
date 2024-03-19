import { BeLogged } from "@/components/be-logged";
import React from "react";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BeLogged route="/login">{children}</BeLogged>;
}
