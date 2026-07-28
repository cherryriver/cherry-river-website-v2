"use client";

/**
 * Boutique cart — Fable design language (dark chocolate drawer, cream text,
 * burgundy CTA). Persists to localStorage; checkout posts the whole cart to
 * /api/checkout (Stripe, fetch-based) and redirects to Stripe's page.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string | null;
  quantity: number;
}

interface CartCtx {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity">) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}

const Ctx = createContext<CartCtx | null>(null);
const LS_KEY = "cr-panier";

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart outside CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch { /* fresh cart */ }
  }, []);

  useEffect(() => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(items)); } catch { /* quota */ }
  }, [items]);

  const add = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const found = prev.find((i) => i.slug === item.slug);
      if (found) return prev.map((i) => (i.slug === item.slug ? { ...i, quantity: Math.min(i.quantity + 1, 99) } : i));
      return [...prev, { ...item, quantity: 1 }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((slug: string) => setItems((prev) => prev.filter((i) => i.slug !== slug)), []);
  const setQty = useCallback((slug: string, qty: number) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.slug !== slug) : prev.map((i) => (i.slug === slug ? { ...i, quantity: Math.min(qty, 99) } : i))
    );
  }, []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => ({ items, add, remove, setQty, clear, open, setOpen }), [items, add, remove, setQty, clear, open]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function CartUI() {
  const { items, remove, setQty, clear, open, setOpen } = useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const count = items.reduce((n, i) => n + i.quantity, 0);
  const total = items.reduce((n, i) => n + i.quantity * i.price, 0);

  const checkout = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Erreur de paiement");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur de paiement");
      setBusy(false);
    }
  };

  return (
    <>
      {/* floating cart button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Panier — ${count} article${count > 1 ? "s" : ""}`}
        style={{
          position: "fixed", right: "clamp(16px,3vw,40px)", bottom: "clamp(16px,3vh,36px)", zIndex: 8600,
          display: count > 0 ? "inline-flex" : "none", alignItems: "center", gap: "10px",
          padding: "14px 22px", borderRadius: "100px", border: "1px solid rgba(244,239,230,0.25)",
          background: "#241c14", color: "#f4efe6", cursor: "pointer",
          fontFamily: "'Hanken Grotesk',sans-serif", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600,
          boxShadow: "0 14px 34px rgba(36,28,20,0.35)",
        }}
      >
        Panier
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "22px", height: "22px", padding: "0 6px", borderRadius: "100px", background: "#8e2436", fontSize: "12px" }}>{count}</span>
      </button>

      {/* overlay */}
      <div
        onClick={() => setOpen(false)}
        style={{ position: "fixed", inset: 0, zIndex: 8700, background: "rgba(20,15,10,0.5)", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity .35s ease" }}
        aria-hidden
      />

      {/* drawer */}
      <aside
        role="dialog"
        aria-label="Panier"
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 8800,
          width: "min(420px, 92vw)", background: "#241c14", color: "#f4efe6",
          transform: open ? "translateX(0)" : "translateX(105%)",
          transition: "transform .45s cubic-bezier(.16,1,.3,1)",
          display: "flex", flexDirection: "column", fontFamily: "'Hanken Grotesk',sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 24px", borderBottom: "1px solid rgba(244,239,230,0.12)" }}>
          <span style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontSize: "20px" }}>Votre panier</span>
          <button type="button" onClick={() => setOpen(false)} aria-label="Fermer" style={{ appearance: "none", background: "transparent", border: 0, color: "#f4efe6", fontSize: "22px", cursor: "pointer", lineHeight: 1 }}>×</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {items.length === 0 && (
            <p style={{ color: "rgba(244,239,230,0.55)", fontSize: "14px" }}>Votre panier est vide.</p>
          )}
          {items.map((i) => (
            <div key={i.slug} style={{ display: "flex", gap: "14px", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(244,239,230,0.08)" }}>
              <div style={{ width: "52px", height: "64px", flex: "none", display: "grid", placeItems: "center", background: "rgba(244,239,230,0.06)", borderRadius: "4px" }}>
                {i.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={i.image} alt="" style={{ maxWidth: "44px", maxHeight: "56px", objectFit: "contain" }} />
                ) : (
                  <span style={{ fontSize: "18px", color: "rgba(244,239,230,0.4)" }}>✦</span>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontSize: "15px", lineHeight: 1.2 }}>{i.name}</div>
                <div style={{ fontSize: "12.5px", color: "rgba(244,239,230,0.55)", marginTop: "4px" }}>{i.price.toFixed(2)} $</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button type="button" onClick={() => setQty(i.slug, i.quantity - 1)} aria-label="Moins" style={qtyBtn}>−</button>
                <span style={{ minWidth: "18px", textAlign: "center", fontSize: "14px" }}>{i.quantity}</span>
                <button type="button" onClick={() => setQty(i.slug, i.quantity + 1)} aria-label="Plus" style={qtyBtn}>+</button>
              </div>
              <button type="button" onClick={() => remove(i.slug)} aria-label="Retirer" style={{ appearance: "none", background: "transparent", border: 0, color: "rgba(244,239,230,0.4)", cursor: "pointer", fontSize: "16px" }}>×</button>
            </div>
          ))}
        </div>

        <div style={{ padding: "20px 24px 26px", borderTop: "1px solid rgba(244,239,230,0.12)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontSize: "14px" }}>
            <span style={{ color: "rgba(244,239,230,0.6)" }}>Sous-total</span>
            <span style={{ fontFamily: "'Familjen Grotesk',sans-serif", fontSize: "18px" }}>{total.toFixed(2)} $ CAD</span>
          </div>
          {error && <div style={{ marginBottom: "12px", fontSize: "12.5px", color: "#e8899b" }}>{error}</div>}
          <button
            type="button"
            onClick={checkout}
            disabled={busy || items.length === 0}
            style={{
              width: "100%", padding: "16px", borderRadius: "100px", border: 0, cursor: busy ? "wait" : "pointer",
              background: "#8e2436", color: "#f4efe6", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600,
              opacity: items.length === 0 ? 0.5 : 1,
            }}
          >
            {busy ? "Redirection…" : "Passer la commande"}
          </button>
          {items.length > 0 && (
            <button type="button" onClick={clear} style={{ width: "100%", marginTop: "10px", padding: "8px", appearance: "none", background: "transparent", border: 0, color: "rgba(244,239,230,0.45)", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>
              Vider le panier
            </button>
          )}
          <p style={{ margin: "14px 0 0", fontSize: "11.5px", lineHeight: 1.5, color: "rgba(244,239,230,0.4)" }}>
            Paiement sécurisé par Stripe · Cueillette en boutique ou livraison au Québec
          </p>
        </div>
      </aside>
    </>
  );
}

const qtyBtn: React.CSSProperties = {
  appearance: "none", width: "24px", height: "24px", borderRadius: "50%",
  border: "1px solid rgba(244,239,230,0.3)", background: "transparent",
  color: "#f4efe6", cursor: "pointer", fontSize: "14px", lineHeight: 1,
};
