"use client";
import { ContextUser } from "@/contexts/ContextUser";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

interface DontHaveLoginProps {
  children: React.ReactNode;
  route: string;
}

function DontHaveLogin({ children, route }: DontHaveLoginProps) {
  const router = useRouter();
  const context = useContext(ContextUser);
  useEffect(() => {
    if (!context) {
      return;
    }
    const { user } = context;
    
    if (user) {
      return router.push(route);
    }
  }, [context]);
  return <>{children}</>;
}

export { DontHaveLogin };
