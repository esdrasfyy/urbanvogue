"use server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { APP_ROUTES } from "@/constants/app-routes";

function isLogged() {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt");

  if (!token) {
    console.log("Token not set");
    return false;
  }
  return true;
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const host = process.env.HOST;

  const appPublicRoutes = Object.values(APP_ROUTES.public);
  const isPublicRoute = appPublicRoutes.includes(pathname);

  const appOthersRoutes = Object.values(APP_ROUTES.others);
  const isOtherRoute = appOthersRoutes.includes(pathname);
  console.log(
    `A rota ${pathname} é publica? ${isPublicRoute} e o usuario esta logado? ${isLogged()}`
  );

  if (isOtherRoute && isLogged()) {
    console.log(
      "Rota de login ou registro, usuario com login sera redirecionado"
    );
    console.log(host);

    return NextResponse.redirect(`${host}account`);
  }
  if (!isPublicRoute && !isOtherRoute && !isLogged()) {
    console.log(host);
    console.log("Rota privada, usuario sem login sera redirecionado");
    return NextResponse.redirect(`${host}login`);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/product", "/login", "/account", "/account/edit","/search", "/checkout", "/forgot-password"],
};
