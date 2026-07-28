"use client";

/**
 * Shared Fable page behaviors — hero video crossfade, line reveals, scroll
 * reveals, counters, product hover swap, parallax + nav state, magnetic
 * buttons, custom cursor, smooth anchors, mega-menu mounting.
 * Ported verbatim from the live build's x-dc scripts.
 */

import { useEffect, type RefObject } from "react";
import CATALOG from "@/lib/fable/catalog.js";

export function useFableBehaviors(rootRef: RefObject<HTMLElement | null>, deps: unknown[] = [], opts: { solidNav?: boolean } = {}) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    // --- Hero video: poster first (LCP), video deferred ---
    const heroVid = root.querySelector<HTMLVideoElement>("[data-hero-video]");
    if (heroVid && reduce) {
      heroVid.remove();
    } else if (heroVid) {
      const srcEl = heroVid.querySelector<HTMLSourceElement>("source[data-src]");
      const loadHeroVideo = () => {
        if (!srcEl || srcEl.getAttribute("src")) return;
        srcEl.src = srcEl.getAttribute("data-src")!;
        heroVid.load();
        heroVid.addEventListener(
          "canplay",
          () => {
            heroVid.style.opacity = "1";
            const poster = root.querySelector<HTMLElement>("[data-hero-poster]");
            if (poster) {
              poster.style.transition = "opacity 1.2s ease";
              poster.style.opacity = "0";
            }
            heroVid.play().catch(() => {});
          },
          { once: true }
        );
      };
      if (typeof requestIdleCallback === "function") requestIdleCallback(loadHeroVideo, { timeout: 2500 });
      else setTimeout(loadHeroVideo, 1200);
    }

    // --- Hero line reveal (plays on load) ---
    const heroLines = root.querySelectorAll<HTMLElement>("[data-hero-line]");
    heroLines.forEach((el, i) => {
      el.style.transition = "transform 1s cubic-bezier(.16,1,.3,1)";
      el.style.transitionDelay = 0.15 + i * 0.12 + "s";
    });
    const heroCta = root.querySelector<HTMLElement>("[data-hero-cta]");
    if (heroCta) {
      heroCta.style.transition = "opacity 1s ease";
      heroCta.style.transitionDelay = 0.15 + heroLines.length * 0.12 + "s";
    }
    const heroTimer = setTimeout(() => {
      heroLines.forEach((el) => (el.style.transform = "translateY(0)"));
      if (heroCta) heroCta.style.opacity = "1";
    }, 80);
    cleanups.push(() => clearTimeout(heroTimer));

    // --- Scroll reveals ---
    const revEls = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]")).map((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(38px)";
      el.style.transition = "opacity 1.1s cubic-bezier(.16,1,.3,1), transform 1.1s cubic-bezier(.16,1,.3,1)";
      return { el, delay: parseFloat(el.getAttribute("data-reveal-delay") || "0"), done: false };
    });
    const revealCheck = () => {
      const vh = window.innerHeight;
      revEls.forEach((o) => {
        if (o.done) return;
        if (o.el.getBoundingClientRect().top < vh * 0.9) {
          o.done = true;
          o.el.style.transitionDelay = o.delay + "ms";
          o.el.style.opacity = "1";
          o.el.style.transform = "translateY(0)";
        }
      });
    };

    // --- Counters ---
    const countEls = Array.from(root.querySelectorAll<HTMLElement>(".cr-count")).map((el) => ({
      el,
      target: parseFloat(el.getAttribute("data-count") || "0"),
      done: false,
    }));
    const countCheck = () => {
      const vh = window.innerHeight;
      countEls.forEach((o) => {
        if (o.done) return;
        if (o.el.getBoundingClientRect().top < vh * 0.85) {
          o.done = true;
          const dur = 1500;
          const t0 = performance.now();
          const iv = setInterval(() => {
            const p = Math.min(1, (performance.now() - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            o.el.textContent = Math.round(o.target * eased).toString();
            if (p >= 1) clearInterval(iv);
          }, 33);
        }
      });
    };

    // --- Product index hover swap ---
    const imgA = root.querySelector<HTMLImageElement>("[data-prod-img-a]");
    const imgB = root.querySelector<HTMLImageElement>("[data-prod-img-b]");
    let showingA = true;
    root.querySelectorAll<HTMLElement>(".cr-prod").forEach((li) => {
      const src = li.getAttribute("data-img");
      if (!src) return;
      const pre = new Image();
      pre.src = src;
      li.addEventListener("mouseenter", () => {
        if (!imgA || !imgB) return;
        const current = showingA ? imgA : imgB;
        if (current.src.endsWith(src)) return;
        const next = showingA ? imgB : imgA;
        next.src = src;
        next.style.opacity = "1";
        current.style.opacity = "0";
        showingA = !showingA;
      });
    });

    // --- Parallax + nav state ---
    const parallax = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"));
    const nav = root.querySelector<HTMLElement>("[data-nav]");
    const onScroll = () => {
      const y = window.scrollY;
      if (!reduce) {
        parallax.forEach((el) => {
          const r = el.getBoundingClientRect();
          const center = r.top + r.height / 2 - window.innerHeight / 2;
          const s = parseFloat(el.getAttribute("data-parallax") || "0");
          el.style.transform = `translate3d(0, ${(-center * s).toFixed(1)}px, 0)`;
        });
      }
      if (nav) {
        if (y > 60) {
          nav.style.background = "rgba(36,28,20,0.92)";
          nav.style.backdropFilter = "blur(14px)";
          (nav.style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter = "blur(14px)";
          nav.style.paddingTop = "16px";
          nav.style.paddingBottom = "16px";
          nav.style.borderBottomColor = "rgba(244,239,230,0.1)";
        } else if (!opts.solidNav) {
          nav.style.background = "transparent";
          nav.style.backdropFilter = "none";
          (nav.style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter = "none";
          nav.style.paddingTop = "26px";
          nav.style.paddingBottom = "26px";
          nav.style.borderBottomColor = "rgba(244,239,230,0)";
        }
      }
      revealCheck();
      countCheck();
    };
    let rafId = 0;
    const rafLoop = () => {
      onScroll();
      rafId = requestAnimationFrame(rafLoop);
    };
    rafId = requestAnimationFrame(rafLoop);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    cleanups.push(() => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    });

    // --- Magnetic buttons ---
    if (!reduce && window.matchMedia("(pointer:fine)").matches) {
      root.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((btn) => {
        btn.style.transition = "transform .5s cubic-bezier(.16,1,.3,1)";
        btn.addEventListener("mousemove", (e) => {
          const r = btn.getBoundingClientRect();
          const mx = e.clientX - r.left - r.width / 2;
          const my = e.clientY - r.top - r.height / 2;
          btn.style.transform = `translate(${mx * 0.25}px, ${my * 0.35}px)`;
        });
        btn.addEventListener("mouseleave", () => {
          btn.style.transform = "translate(0,0)";
        });
      });
    }

    // --- Custom cursor ---
    if (window.matchMedia("(pointer:fine)").matches) {
      const dot = root.querySelector<HTMLElement>("[data-cursor-dot]");
      const ring = root.querySelector<HTMLElement>("[data-cursor-ring]");
      let mx = window.innerWidth / 2,
        my = window.innerHeight / 2;
      let rx = mx,
        ry = my;
      const onMove = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
        if (dot) {
          dot.style.left = mx + "px";
          dot.style.top = my + "px";
        }
      };
      window.addEventListener("mousemove", onMove);
      let cursorRaf = 0;
      const loop = () => {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        if (ring) {
          ring.style.left = rx + "px";
          ring.style.top = ry + "px";
        }
        cursorRaf = requestAnimationFrame(loop);
      };
      loop();
      const hoverables = root.querySelectorAll<HTMLElement>("a, button, [data-magnetic], .cr-prod");
      hoverables.forEach((h) => {
        h.addEventListener("mouseenter", () => {
          if (ring) {
            ring.style.width = "64px";
            ring.style.height = "64px";
            ring.style.background = "rgba(231,211,173,0.12)";
            ring.style.borderColor = "rgba(231,211,173,0.7)";
          }
        });
        h.addEventListener("mouseleave", () => {
          if (ring) {
            ring.style.width = "38px";
            ring.style.height = "38px";
            ring.style.background = "transparent";
            ring.style.borderColor = "rgba(244,239,230,0.5)";
          }
        });
      });
      document.body.style.cursor = "none";
      cleanups.push(() => {
        window.removeEventListener("mousemove", onMove);
        cancelAnimationFrame(cursorRaf);
        document.body.style.cursor = "";
      });
    }

    // --- Smooth anchor scrolling ---
    root.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href")!;
        if (id.length > 1) {
          const tgt = document.querySelector(id);
          if (tgt) {
            e.preventDefault();
            window.scrollTo({ top: tgt.getBoundingClientRect().top + window.scrollY - 70, behavior: "smooth" });
          }
        }
      });
    });

    // --- Méga-menus (source: lib/fable/catalog.js) ---
    const t = root.querySelector<HTMLElement>("[data-produits-trigger]");
    const b = root.querySelector<HTMLElement>("[data-boutique-trigger]");
    if (t) CATALOG.mountMenu(t);
    if (b) CATALOG.mountBoutiqueMenu(b);

    return () => cleanups.forEach((fn) => fn());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
