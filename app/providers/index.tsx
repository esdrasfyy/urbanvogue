"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { CartProvider } from "../contexts/ContextCart/index";
import { UserProvider } from "../contexts/ContextUser";
import { PayProvider } from "../contexts/ContextPay";
import { LoadingProvider } from "@/contexts/ContextLoading";
import { NotificationProvider } from "@/contexts/ContextNotification";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <UserProvider>
        <CartProvider>
          <NotificationProvider>
            <PayProvider>
              <ChakraProvider>{children}</ChakraProvider>
            </PayProvider>
          </NotificationProvider>
        </CartProvider>
      </UserProvider>
    </LoadingProvider>
  );
}
