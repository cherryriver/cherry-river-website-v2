"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useCallback, useRef, useState } from "react";
import { useNavTheme } from "@/hooks/useNavTheme";

/* Mega-menu product columns */
type MegaColumn = { href: string; label: string; product: string; image: string; isLogo?: boolean; isGrid?: boolean; isCan?: boolean };

const MEGA_COLUMNS: MegaColumn[] = [
  { href: "/produits/gins", label: "Gins", product: "Dry Gin", image: "/assets/products/CR_DryGin_750mL.png" },
  { href: "/produits/vodkas", label: "Vodkas", product: "Vodka Érable", image: "/assets/products/CR_Vodka_Erable_750mL.png" },
  { href: "/produits/tequila", label: "Tequila", product: "Tequila Silver", image: "/assets/products/CR_TequilaSilver_750mL.png" },
  { href: "/produits/rhums", label: "Rhums", product: "Rhum Ambré", image: "/assets/products/CR_RhumAmbre_750mL.png" },
  { href: "/produits/whisky", label: "Whisky", product: "Bourbon", image: "/assets/products/Ope_LiqueurWhisky_750mL.png" },
  { href: "/produits/liqueurs", label: "Liqueurs", product: "Crème Coaticook", image: "/assets/products/Coaticook_Vanille_750mL.png" },
  { href: "/produits/canettes", label: "Prêt-à-boire", product: "Gin Limonade", image: "/assets/products/cans/CherryRiver_GinLimon_355mL_FRAN.png", isCan: true },
  { href: "/produits/collaborations", label: "Opemiska", product: "", image: "/assets/brands/opemiska/Logo_Opemiska_Blanc.png", isLogo: true },
  { href: "/produits/tous", label: "Toute la collection", product: "", image: "", isGrid: true },
];

/* Sans Alcool mega-menu columns */
type SansAlcoolColumn = { href: string; label: string; subtitle: string; image: string; isCan?: boolean; isBottle?: boolean; isLogo?: boolean };

const SANS_ALCOOL_COLUMNS: SansAlcoolColumn[] = [
  { href: "/produits/sans-alcool/prets-a-boire", label: "Prêts-à-boire", subtitle: "Mocktails en canette", image: "/assets/products/cans-na/CR_Cosmo_355mL_SANS_ALCOOL_FRAN.png", isCan: true },
  { href: "/produits/sans-alcool/spiritueux", label: "Spiritueux", subtitle: "Gin sans alcool", image: "/assets/products/CR_Gin_Berries_SANS_ALCOOL_750mL.png", isBottle: true },
  { href: "/produits/sans-alcool/sirops", label: "Sirops & Allongeurs", subtitle: "Sirops, mixers & limonades", image: "/assets/brands/cherry-river/CherryRiver_Logo_Blanc.png", isLogo: true },
];

/* Sans Alcool mobile items (for accordion) */
const SANS_ALCOOL_ITEMS = [
  { href: "/produits/sans-alcool/prets-a-boire", label: "Prêts-à-boire" },
  { href: "/produits/sans-alcool/spiritueux", label: "Spiritueux sans alcool" },
  { href: "/produits/sans-alcool/sirops", label: "Sirops & Allongeurs" },
  { href: "/produits/sans-alcool", label: "Tout voir" },
] as const;

/* Desktop nav links */
type NavItem =
  | { kind: "link"; href: string; label: string }
  | { kind: "mega"; label: string }
  | { kind: "sansAlcool"; label: string };

const NAV_LINKS: NavItem[] = [
  { kind: "link", href: "/distilleries", label: "Distilleries" },
  { kind: "link", href: "/experiences", label: "Expériences" },
  { kind: "link", href: "/cocktail-culture", label: "Cocktail Culture" },
  { kind: "mega", label: "Produits" },
  { kind: "sansAlcool", label: "Sans Alcool" },
  { kind: "link", href: "/boutique", label: "Boutique" },
  { kind: "link", href: "/la-maison", label: "La Maison" },
  { kind: "link", href: "/contact", label: "Contact" },
];

/* Mobile sub-items under "Nos Produits" */
const MOBILE_PRODUITS = [
  { href: "/produits/gins", label: "Gins" },
  { href: "/produits/vodkas", label: "Vodkas" },
  { href: "/produits/tequila", label: "Tequila" },
  { href: "/produits/rhums", label: "Rhums" },
  { href: "/produits/whisky", label: "Whisky" },
  { href: "/produits/liqueurs", label: "Liqueurs" },
  { href: "/produits/canettes", label: "Prêt-à-boire" },
  { href: "/produits/collaborations", label: "Opemiska" },
  { href: "/produits/tous", label: "Tous nos produits" },
] as const;

/* Mobile accordion items */
const MOBILE_NAV = [
  { label: "Distilleries", href: "/distilleries" },
  { label: "Nos Produits", href: "#", hasChildren: true, childrenKey: "produits" as const },
  { label: "Expériences", href: "/experiences" },
  { label: "Cocktail Culture", href: "/cocktail-culture" },
  { label: "Sans Alcool", href: "#", hasChildren: true, childrenKey: "sans-alcool" as const },
  { label: "Boutique", href: "/boutique" },
  { label: "La Maison", href: "/la-maison" },
  { label: "Contact", href: "/contact" },
] as const;

const SOCIAL = [
  { href: "https://www.instagram.com/cherryriverdistillerie/", label: "Instagram", icon: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z" },
  { href: "https://www.facebook.com/CherryRiverDistillerie", label: "Facebook", icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
  { href: "https://www.youtube.com/@cherryriverdistillerie", label: "YouTube", icon: "M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" },
] as const;

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [sansAlcoolOpen, setSansAlcoolOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaBtnRef = useRef<HTMLButtonElement>(null);
  const sansAlcoolRef = useRef<HTMLDivElement>(null);
  const sansAlcoolBtnRef = useRef<HTMLButtonElement>(null);

  // Detect background theme of the section currently behind the nav (top 0-80px).
  // 'dark' (default) | 'light' (cream/white sections) | 'carousel' (homepage bottle showcase)
  const navTheme = useNavTheme();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMega = useCallback(() => setMegaOpen(false), []);
  const closeSansAlcool = useCallback(() => setSansAlcoolOpen(false), []);
  const closeAllDropdowns = useCallback(() => { setMegaOpen(false); setSansAlcoolOpen(false); }, []);

  useEffect(() => {
    if (!megaOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (megaRef.current?.contains(target)) return;
      if (megaBtnRef.current?.contains(target)) return;
      closeMega();
    };
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") closeMega(); };
    requestAnimationFrame(() => {
      document.addEventListener("mousedown", handleClick);
    });
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [megaOpen, closeMega]);

  useEffect(() => {
    if (!sansAlcoolOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (sansAlcoolRef.current?.contains(target)) return;
      if (sansAlcoolBtnRef.current?.contains(target)) return;
      closeSansAlcool();
    };
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") closeSansAlcool(); };
    requestAnimationFrame(() => {
      document.addEventListener("mousedown", handleClick);
    });
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [sansAlcoolOpen, closeSansAlcool]);

  const anyDropdownOpen = megaOpen || sansAlcoolOpen;
  const navOpaque = scrolled || anyDropdownOpen;

  // When the nav is opaque (rgba(10,10,10,0.97)) or the mobile menu panel (#0a0a0a) is open,
  // the background behind the nav is dark regardless of the section behind. Theme detection
  // only matters when the nav is transparent at the top with no overlay.
  const effectiveTheme: "dark" | "light" | "carousel" =
    navOpaque || mobileOpen ? "dark" : navTheme;

  // Link color: warm cream on dark backgrounds, near-black on light backgrounds.
  const linkColor =
    effectiveTheme === "light"
      ? "rgba(10,10,10,0.75)"
      : navOpaque
      ? "rgba(240,235,228,0.75)"
      : "rgba(255,255,255,0.75)";

  // Hamburger bar color: switches to dark over light sections, stays cream otherwise.
  const hamburgerColor = effectiveTheme === "light" ? "#0a0a0a" : "#f0ebe4";

  // Logo source + opacity depending on what's behind the nav.
  // - light section visible at the top → swap to the black logo (white logo would disappear)
  // - homepage bottle carousel visible → keep white logo but fade to 0.3 to avoid clash
  // - everything else (dark sections, scrolled state, dropdowns) → white logo at full opacity
  const logoSrc =
    effectiveTheme === "light"
      ? "/assets/brands/cherry-river/Cherry_River_Chien_Noir.png"
      : "/assets/brands/cherry-river/Cherry_River_Chien_Blanc.png";
  const logoOpacity = effectiveTheme === "carousel" ? 0.3 : 1;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        suppressHydrationWarning
        style={{
          backgroundColor: scrolled || anyDropdownOpen ? "rgba(10,10,10,0.97)" : "transparent",
          borderBottom: scrolled ? "0.5px solid rgba(42,37,32,0.5)" : "none",
          backdropFilter: scrolled || anyDropdownOpen ? "blur(16px)" : "none",
        }}
      >
        <div className="relative mx-auto flex items-center justify-between px-6 py-5 lg:px-10 xl:px-14" style={{ maxWidth: 1600 }}>
          {/* Logo - far left.
              Source + opacity are driven by `useNavTheme` so the logo stays legible:
              - light section behind nav → black logo
              - homepage bottle carousel behind nav → white logo at 0.3 opacity
              - everything else → white logo at full opacity
              Sizes: 110px mobile / 140px desktop (graphiste a réduit depuis 190px). */}
          <Link href="/" className="relative z-50 shrink-0" style={{ marginRight: "auto" }}>
            <Image
              src={logoSrc}
              alt="Cherry River"
              width={140}
              height={28}
              className="h-auto max-h-[96px] w-auto"
              style={{ opacity: logoOpacity, transition: "opacity 300ms ease-out" }}
              priority
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-4 lg:flex xl:gap-5 2xl:gap-6">
            {NAV_LINKS.map((item) => {
              const navCls = "whitespace-nowrap font-body text-[0.75rem] font-normal uppercase tracking-[0.15em] transition-colors duration-300 hover:!text-[#C9A84C]";

              if (item.kind === "mega") {
                return (
                  <button
                    key={item.label}
                    ref={megaBtnRef}
                    onClick={() => { setMegaOpen((o) => !o); setSansAlcoolOpen(false); }}
                    className={navCls}
                    style={{ color: megaOpen ? "#C9A84C" : linkColor, background: "none", border: "none", cursor: "pointer" }}
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                  </button>
                );
              }

              if (item.kind === "sansAlcool") {
                return (
                  <button
                    key={item.label}
                    ref={sansAlcoolBtnRef}
                    onClick={() => { setSansAlcoolOpen((o) => !o); setMegaOpen(false); }}
                    className={navCls}
                    style={{ color: sansAlcoolOpen ? "#C9A84C" : linkColor, background: "none", border: "none", cursor: "pointer" }}
                    aria-expanded={sansAlcoolOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                  </button>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={navCls}
                  style={{ color: linkColor }}
                  onClick={closeAllDropdowns}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* HAMBURGER (mobile) */}
          <button
            className="relative z-[70] ml-auto flex h-12 w-12 flex-col items-center justify-center gap-[6px] lg:hidden"
            onClick={() => { setMobileOpen((o) => !o); setMobileAccordion(null); }}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <span className="block h-[1px] w-5 transition-all duration-300" style={{ backgroundColor: hamburgerColor, transform: mobileOpen ? "rotate(45deg) translateY(3.5px)" : "none" }} />
            <span className="block h-[1px] w-5 transition-all duration-300" style={{ backgroundColor: hamburgerColor, opacity: mobileOpen ? 0 : 1 }} />
            <span className="block h-[1px] w-5 transition-all duration-300" style={{ backgroundColor: hamburgerColor, transform: mobileOpen ? "rotate(-45deg) translateY(-3.5px)" : "none" }} />
          </button>
        </div>

        {/* MEGA-MENU PANEL (desktop) - 100% inline styles */}
        <div
          ref={megaRef}
          style={{
            position: "fixed",
            top: 80,
            left: 0,
            right: 0,
            zIndex: 40,
            display: megaOpen ? "flex" : "none",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: 0,
            padding: "28px 40px 32px",
            backgroundColor: "rgba(10,10,10,0.97)",
            backdropFilter: "blur(16px)",
            borderTop: "0.5px solid rgba(201,168,76,0.1)",
          }}
        >
          {MEGA_COLUMNS.map((col, i) => (
            <Link
              key={col.href}
              href={col.href}
              onClick={closeMega}
              prefetch
              className="group"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
                minWidth: 0,
                borderRight: i < MEGA_COLUMNS.length - 1 ? "1px solid rgba(255,255,255,0.12)" : "none",
                padding: "0 12px",
                textDecoration: "none",
              }}
            >
              {/* Image */}
              <div style={{ height: col.isLogo ? 160 : col.isGrid ? 160 : col.isCan ? 140 : 180, display: "flex", alignItems: col.isLogo ? "flex-end" : col.isCan ? "center" : col.isGrid ? "center" : "flex-end", justifyContent: "center", width: "100%", paddingBottom: col.isLogo ? 4 : 0 }}>
                {col.isGrid ? (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.4, color: "#C9A84C" }}>
                    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1" />
                  </svg>
                ) : col.isLogo ? (
                  <Image
                    src={col.image}
                    alt={col.label}
                    loading="eager"
                    width={100}
                    height={60}
                    style={{ maxHeight: 50, objectFit: "contain", opacity: 0.7 }}
                  />
                ) : col.isCan ? (
                  <div className="transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[3px]">
                    <Image
                      src={col.image}
                    alt={col.label}
                    loading="eager"
                      width={70}
                      height={140}
                      style={{ maxHeight: 130, objectFit: "contain" }}
                    />
                  </div>
                ) : (
                  <div
                    className="transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[3px]"
                    style={{
                      WebkitBoxReflect: "below 0px linear-gradient(transparent 50%, rgba(255,255,255,0.12))",
                      filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.6))",
                    }}
                  >
                    <Image
                      src={col.image}
                    alt={col.label}
                    loading="eager"
                      width={90}
                      height={180}
                      style={{ height: 180, width: "auto", objectFit: "contain" }}
                    />
                  </div>
                )}
              </div>

              {/* Label + underline doré (signature Aesop) */}
              <div style={{ position: "relative", marginTop: 12, display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ color: "#C9A84C", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-body), monospace", textAlign: "center" }}>
                  {col.label}
                </span>
                <span
                  className="block h-px bg-[#C9A84C] origin-center transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] scale-x-0 group-hover:scale-x-100"
                  style={{ width: "100%", marginTop: 4 }}
                  aria-hidden="true"
                />
              </div>
              {col.product ? (
                <span style={{ color: "rgba(240,235,228,0.45)", fontSize: 9, marginTop: 4, fontFamily: "var(--font-body), monospace" }}>
                  {col.product}
                </span>
              ) : null}
            </Link>
          ))}
        </div>

        {/* SANS ALCOOL MEGA-MENU (desktop) - 100% inline styles */}
        <div
          ref={sansAlcoolRef}
          style={{
            position: "fixed",
            top: 80,
            left: 0,
            right: 0,
            zIndex: 40,
            display: sansAlcoolOpen ? "flex" : "none",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(10,10,10,0.97)",
            backdropFilter: "blur(16px)",
            borderTop: "0.5px solid rgba(201,168,76,0.1)",
          }}
        >
          {/* Columns row */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-end",
              gap: 0,
              padding: "28px 60px 24px",
              width: "100%",
              maxWidth: 900,
            }}
          >
            {SANS_ALCOOL_COLUMNS.map((col, i) => (
              <Link
                key={col.href}
                href={col.href}
                onClick={closeSansAlcool}
                prefetch
                className="group"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                  minWidth: 0,
                  borderRight: i < SANS_ALCOOL_COLUMNS.length - 1 ? "1px solid rgba(255,255,255,0.12)" : "none",
                  padding: "0 20px",
                  textDecoration: "none",
                }}
              >
                {/* Image container */}
                <div style={{ height: col.isBottle ? 180 : col.isLogo ? 140 : 140, display: "flex", alignItems: col.isLogo ? "center" : col.isCan ? "center" : "flex-end", justifyContent: "center", width: "100%" }}>
                  {col.isBottle ? (
                    <div
                      className="transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[3px]"
                      style={{
                        WebkitBoxReflect: "below 0px linear-gradient(transparent 50%, rgba(255,255,255,0.12))",
                        filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.6))",
                      }}
                    >
                      <Image
                        src={col.image}
                    alt={col.label}
                    loading="eager"
                        width={90}
                        height={180}
                        style={{ height: 180, width: "auto", objectFit: "contain" }}
                      />
                    </div>
                  ) : col.isLogo ? (
                    <Image
                      src={col.image}
                    alt={col.label}
                    loading="eager"
                      width={120}
                      height={50}
                      style={{ maxHeight: 45, objectFit: "contain", opacity: 0.6 }}
                    />
                  ) : (
                    <div className="transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[3px]">
                      <Image
                        src={col.image}
                    alt={col.label}
                    loading="eager"
                        width={70}
                        height={140}
                        style={{ maxHeight: 130, objectFit: "contain" }}
                      />
                    </div>
                  )}
                </div>

                {/* Label + underline doré (signature Aesop) */}
                <div style={{ position: "relative", marginTop: 14, display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
                  <span style={{ color: "#C9A84C", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-body), monospace", textAlign: "center", display: "flex", alignItems: "center", gap: 6 }}>
                    {col.label}
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ opacity: 0.6 }}>
                      <path d="M2 1l3 3-3 3" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span
                    className="block h-px bg-[#C9A84C] origin-center transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] scale-x-0 group-hover:scale-x-100"
                    style={{ width: "100%", marginTop: 4 }}
                    aria-hidden="true"
                  />
                </div>
                {col.subtitle ? (
                  <span style={{ color: "rgba(240,235,228,0.4)", fontSize: 9, marginTop: 4, fontFamily: "var(--font-body), monospace", textAlign: "center" }}>
                    {col.subtitle}
                  </span>
                ) : null}
              </Link>
            ))}
          </div>

          {/* Bottom CTA line */}
          <div style={{ width: "100%", borderTop: "0.5px solid rgba(255,255,255,0.06)", padding: "14px 0", display: "flex", justifyContent: "center" }}>
            <Link
              href="/produits/sans-alcool"
              onClick={closeSansAlcool}
              prefetch
              style={{
                color: "#C9A84C",
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontFamily: "var(--font-body), monospace",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.7"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
            >
              Voir tous les produits sans alcool
              <span style={{ display: "inline-block", transition: "transform 0.3s ease" }}>→</span>
            </Link>
          </div>
        </div>
      </header>

      {/* MOBILE FULLSCREEN MENU */}
      <div
        className="fixed inset-0 z-[60] flex flex-col transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] lg:hidden"
        style={{
          background: "#0a0a0a",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          opacity: mobileOpen ? 1 : 0,
        }}
      >
        {/* Close button */}
        <button
          className="absolute left-5 top-5 z-10 flex h-11 w-11 items-center justify-center"
          onClick={() => setMobileOpen(false)}
          aria-label="Fermer le menu"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <line x1="3" y1="3" x2="15" y2="15" stroke="#f0ebe4" strokeWidth="1.2" />
            <line x1="15" y1="3" x2="3" y2="15" stroke="#f0ebe4" strokeWidth="1.2" />
          </svg>
        </button>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-8 pt-20 pb-6">
          <ul className="space-y-0">
            {MOBILE_NAV.map((item) => {
              const isAccordion = "hasChildren" in item && item.hasChildren;
              const isOpen = mobileAccordion === item.label;

              if (isAccordion) {
                const childrenKey = "childrenKey" in item ? item.childrenKey : "produits";
                const subItems = childrenKey === "sans-alcool" ? SANS_ALCOOL_ITEMS : MOBILE_PRODUITS;

                return (
                  <li key={item.label} style={{ borderBottom: "0.5px solid rgba(240,235,228,0.08)" }}>
                    <button
                      className="flex w-full items-center justify-between py-5"
                      onClick={() => setMobileAccordion(isOpen ? null : item.label)}
                      style={{ background: "none", border: "none" }}
                    >
                      <span className="flex items-center gap-3 font-body text-[0.8rem] font-normal uppercase tracking-[0.15em]" style={{ color: childrenKey === "sans-alcool" ? "#C9A84C" : "#f0ebe4" }}>
                        {childrenKey === "sans-alcool" && (
                          <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#C9A84C", flexShrink: 0 }} />
                        )}
                        {item.label}
                      </span>
                      <svg
                        className="h-4 w-4 transition-transform duration-300"
                        style={{ color: "#C9A84C", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                      </svg>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)]"
                      style={{ maxHeight: isOpen ? 500 : 0, opacity: isOpen ? 1 : 0 }}
                    >
                      <div className="space-y-0 pb-4 pl-4">
                        {subItems.map((sub) => (
                          <Link
                            key={sub.href + sub.label}
                            href={sub.href}
                            onClick={() => { setMobileOpen(false); setMobileAccordion(null); }}
                            className="block py-2.5 font-body text-[0.7rem] font-light uppercase tracking-[0.12em] transition-colors duration-200 hover:text-[#C9A84C]"
                            style={{ color: "rgba(240,235,228,0.5)" }}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.label} style={{ borderBottom: "0.5px solid rgba(240,235,228,0.08)" }}>
                  <Link
                    href={item.href}
                    onClick={() => { setMobileOpen(false); setMobileAccordion(null); }}
                    className="block py-5 font-body text-[0.8rem] font-normal uppercase tracking-[0.15em] transition-colors duration-200 hover:text-[#C9A84C]"
                    style={{ color: "#f0ebe4" }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-6 py-6">
          {SOCIAL.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center transition-colors duration-200 hover:text-[#C9A84C]"
              style={{ color: "rgba(240,235,228,0.5)" }}
              aria-label={s.label}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d={s.icon} fill="currentColor" />
              </svg>
            </a>
          ))}
        </div>

        {/* Newsletter banner */}
        <div
          className="mx-6 mb-6 flex items-center justify-center py-4"
          style={{ borderTop: "0.5px solid rgba(201,168,76,0.15)" }}
        >
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="font-body text-[0.6rem] font-normal uppercase tracking-[0.3em] transition-colors duration-200 hover:text-[#C9A84C]"
            style={{ color: "#C9A84C" }}
          >
            S&apos;abonner à nos nouvelles
          </Link>
        </div>
      </div>
    </>
  );
}
