"use client";

import { useEffect, useState } from "react";

/**
 * Theme courant de la navigation, dérivé de la section visible
 * dans la zone de détection (top 0 → 80px).
 *
 * - "dark"     : fond sombre (par défaut). Logo blanc, pleine opacité.
 * - "light"    : fond clair (crème/blanc). Logo noir, pleine opacité.
 * - "carousel" : section "carrousel de bouteilles". Logo blanc estompé (opacity 0.3).
 */
export type NavTheme = "dark" | "light" | "carousel";

const NAV_DETECTION_ZONE = 80; // px
const SELECTOR = "[data-nav-theme]";

/**
 * Détecte le `data-nav-theme` de la section qui passe sous la barre
 * de navigation (les premiers 80px du viewport).
 *
 * Stratégie :
 * - On observe toutes les sections marquées `data-nav-theme`.
 * - Au scroll, on cherche la section dont le rect croise la zone [0, 80px].
 * - Si aucune section ne croise la zone, on tombe sur "dark" (par défaut).
 *
 * IntersectionObserver est utilisé pour limiter la liste de candidats
 * (sections proches de la zone), puis on calcule au scroll quelle
 * section est réellement *dans* la zone.
 */
export function useNavTheme(): NavTheme {
  const [theme, setTheme] = useState<NavTheme>("dark");

  useEffect(() => {
    if (typeof window === "undefined") return;

    let candidates: HTMLElement[] = [];
    let ticking = false;

    const recomputeTheme = () => {
      ticking = false;

      // Cherche la section qui croise la zone [0, NAV_DETECTION_ZONE].
      let active: HTMLElement | null = null;

      for (const el of candidates) {
        const rect = el.getBoundingClientRect();
        const intersects = rect.top < NAV_DETECTION_ZONE && rect.bottom > 0;
        if (intersects) {
          active = el;
          break; // première section trouvée gagne (ordre DOM)
        }
      }

      const next = (active?.dataset.navTheme as NavTheme | undefined) ?? "dark";
      setTheme((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(recomputeTheme);
      }
    };

    // Construit la liste des sections candidates et observe leur visibilité.
    const refreshCandidates = () => {
      candidates = Array.from(
        document.querySelectorAll<HTMLElement>(SELECTOR),
      );
      recomputeTheme();
    };

    // Premier passage.
    refreshCandidates();

    // Re-scan en cas d'ajout/suppression de sections (navigation client-side).
    const mutationObserver = new MutationObserver(() => {
      refreshCandidates();
    });
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-nav-theme"],
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mutationObserver.disconnect();
    };
  }, []);

  return theme;
}
