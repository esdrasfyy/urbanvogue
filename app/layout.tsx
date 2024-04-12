import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers/index";
import { Header } from "./components/header/index";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
import favicon from "@/favicon.ico";
import { Cart } from "./components/cart/index";
import { Footer } from "./components/footer";
import { LoadingGlobal } from "./components/loading";
import { Voice } from "./components/voice";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={`${favicon}`} />
      </head>
      <body
        className={`${inter.className} flex flex-col min-w-full items-center justify-end min-h-screen bg-custom-grayOne`}
      >
        <Providers>
          <LoadingGlobal/>
          <Cart />
          <Header />
          {children}
          <Voice/>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
