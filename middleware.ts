"use server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { APP_ROUTES } from "@/constants/app-routes";

function isLogged() {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt");

  if (!token) {
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

  if (isOtherRoute && isLogged()) {
    return NextResponse.redirect(`${host}account`);
  }
  if (!isPublicRoute && !isOtherRoute && !isLogged()) {
    return NextResponse.redirect(`${host}login`);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/product", "/login", "/forgot-password", "/register", "/account", "/account/edit","/search", "/checkout", "/checkout/approve"],
};
