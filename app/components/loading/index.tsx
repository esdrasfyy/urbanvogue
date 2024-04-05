"use client";
import { ContextLoading } from "@/contexts/ContextLoading";
import React, { useContext } from "react";
import { ImSpinner9 } from "react-icons/im";

function LoadingGlobal() {
  const context = useContext(ContextLoading)!;
  const { loading } = context;
  return (
    <>
      {loading && (
        <div className="flex fixed bg-custom-grayTwo/90 w-full h-screen overflow-hidden top-0 z-50 items-center justify-center">
          <div className="text-custom-pink p-8 rounded-md shadow-snipped bg-custom-grayTwo">
            <ImSpinner9 className="animate-spin text-7xl" />
          </div>
        </div>
      )}
    </>
  );
}

export { LoadingGlobal };
