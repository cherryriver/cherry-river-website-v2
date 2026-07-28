"use client";

import { usePathname } from "next/navigation";

/** Routes ported to the Fable design — they carry their own nav/footer (FableChrome). */
export const FABLE_ROUTES = ["/", "/produits", "/boutique", "/recettes", "/experiences", "/contact", "/distilleries", "/la-maison", "/cocktail-culture"];

export function isFableRoute(pathname: string): boolean {
  return FABLE_ROUTES.some((r) => (r === "/" ? pathname === "/" : pathname === r || pathname.startsWith(r + "/")));
}

/** Renders the legacy site chrome (old nav/footer) only on routes not yet ported. */
export function LegacyChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isFableRoute(pathname)) return null;
  return <>{children}</>;
}
