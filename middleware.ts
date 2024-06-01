"use server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { APP_ROUTES } from "@/constants/app-routes";

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const isLogged = cookieStore.get("jwt");
console.log(isLogged);

  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const host = process.env.HOST;

  const appPrivateRoutes = Object.values(APP_ROUTES.private);
  const isPrivateRoute = appPrivateRoutes.includes(pathname);

  const appOthersRoutes = Object.values(APP_ROUTES.others);
  const isOtherRoute = appOthersRoutes.includes(pathname);

  if (isOtherRoute && isLogged) {
    return NextResponse.redirect(`${host}account`);
  }
  if (isPrivateRoute && !isLogged) {
    return NextResponse.redirect(`${host}login`);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/product", "/login", "/forgot-password", "/register", "/account", "/account/edit", "/account/orders","/search", "/checkout", "/checkout/approve"],
};
