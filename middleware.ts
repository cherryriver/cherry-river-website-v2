import { NextResponse, type NextRequest } from "next/server";
import { isBackgroundVariant } from "@/lib/design-variants";

const BACKGROUND_COOKIE = "cr-bg";

export function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const background = nextUrl.searchParams.get("bg");

  const hasBackgroundVariant = isBackgroundVariant(background);

  if (!hasBackgroundVariant) {
    return NextResponse.next();
  }

  const redirectUrl = nextUrl.clone();
  redirectUrl.searchParams.delete("bg");

  const response = NextResponse.redirect(redirectUrl);

  response.cookies.set(BACKGROUND_COOKIE, background, {
    path: "/",
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
};
