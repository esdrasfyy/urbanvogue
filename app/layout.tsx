import { Inter } from "next/font/google";
import { Providers } from "./providers/index";
import { Header } from "./components/header/index";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import favicon from "@/favicon.ico";
import { Cart } from "./components/cart/index";
import { Footer } from "./components/footer";
import { LoadingGlobal } from "./components/loading";
import { CookiesPrivacy } from "./components/cookies";
import { Notifications } from "./components/notify";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="theme-color" content="#ed145b" />
        <link rel="icon" href={`${favicon}`} />
        <title>Urban Vogue</title>
        <meta property="og:title" content="Urban Vogue" />
        <meta property="og:site_name" content="Urban Vogue" />
        <meta property="og:type" content="website" />
        <meta
          name="description"
          content="Welcome to Urban Vogue, the largest urban fashion store in Latin America. We're here to help you with all your urban fashion needs!"
        />
        <meta
          property="og:description"
          content="Welcome to Urban Vogue, the largest urban fashion store in Latin America. We're here to help you with all your urban fashion needs!"
        />
        <link rel="canonical" href="https://urbanvogue.cloud/" />
        <meta property="og:url" content="https://urbanvogue.cloud/" />
        <meta property="og:image" content={`${favicon}`} />
      </head>
      <body
        className={`${inter.className} flex flex-col min-w-full items-center justify-end min-h-screen bg-custom-grayOne`}
      >
        <Providers>
          <LoadingGlobal />
          <Cart />
          <Notifications/>
          <Header />
          {children}
          <CookiesPrivacy />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
