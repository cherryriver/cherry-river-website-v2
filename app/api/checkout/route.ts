import { NextRequest, NextResponse } from "next/server";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://website-cherry-river.vercel.app";

interface CheckoutItem {
  slug: string;
  name: string;
  price: number;
  image?: string | null;
  quantity?: number;
}

// Accepts either a single item ({slug,name,price,...}) or a cart ({items: [...]}).
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const items: CheckoutItem[] = Array.isArray(body.items)
      ? body.items
      : [{ slug: body.slug, name: body.name, price: body.price, image: body.image, quantity: body.quantity }];

    if (!items.length || items.length > 20) {
      return NextResponse.json({ error: "Panier invalide" }, { status: 400 });
    }

    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return NextResponse.json({ error: "Stripe non configuré" }, { status: 500 });
    }

    const params = new URLSearchParams({
      mode: "payment",
      success_url: `${SITE_URL}/boutique?commande=succes`,
      cancel_url: `${SITE_URL}/boutique`,
    });

    items.forEach((item, i) => {
      const { slug, name, price } = item;
      const quantity = Math.min(Math.max(Math.round(Number(item.quantity ?? 1)), 1), 99);
      const unitAmount = Math.round(Number(price) * 100);
      if (!slug || !name || isNaN(unitAmount) || unitAmount <= 0) {
        throw new Error("Article invalide dans le panier");
      }
      params.set(`line_items[${i}][quantity]`, String(quantity));
      params.set(`line_items[${i}][price_data][currency]`, "cad");
      params.set(`line_items[${i}][price_data][unit_amount]`, String(unitAmount));
      params.set(`line_items[${i}][price_data][product_data][name]`, name);
      if (item.image) {
        params.set(`line_items[${i}][price_data][product_data][images][0]`, `${SITE_URL}${item.image}`);
      }
      params.set(`metadata[slug_${i}]`, slug);
    });

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await res.json() as { url?: string; error?: { message: string } };

    if (!res.ok) {
      return NextResponse.json({ error: data.error?.message ?? "Stripe error" }, { status: 500 });
    }

    return NextResponse.json({ url: data.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[checkout]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
