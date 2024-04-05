"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { CartProvider } from "../contexts/ContextCart/index";
import { UserProvider } from "../contexts/ContextUser";
import { PayProvider } from "../contexts/ContextPay";
import { LoadingProvider } from "@/contexts/ContextLoading";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <UserProvider>
        <CartProvider>
          <PayProvider>
            <ChakraProvider>{children}</ChakraProvider>
          </PayProvider>
        </CartProvider>
      </UserProvider>
    </LoadingProvider>
  );
}
