"use client";
import React, { useState, createContext, ReactNode } from "react";
import { ContextLoadingProps } from "./types";

const ContextLoading = createContext<ContextLoadingProps | undefined>(
  undefined
);

const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const contextValue: ContextLoadingProps = {
    loading,
    setLoading,
  };

  return (
    <ContextLoading.Provider value={contextValue}>
      {children}
    </ContextLoading.Provider>
  );
};

export { ContextLoading, LoadingProvider };
