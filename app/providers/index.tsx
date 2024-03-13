"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { CartProvider } from "@/contexts/ContextCart/index";
import { UserProvider } from "../contexts/ContextUser";
import { PayProvider } from "../contexts/ContextPay";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <UserProvider>
        <CartProvider>
          <PayProvider>
            <ChakraProvider>{children}</ChakraProvider>
          </PayProvider>
        </CartProvider>
      </UserProvider>
  );
}
