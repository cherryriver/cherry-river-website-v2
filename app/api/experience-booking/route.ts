import { NextRequest, NextResponse } from "next/server";
import { EXPERIENCES } from "@/content/experiences-data";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://website-cherry-river.vercel.app";

interface BookingRequest {
  experienceId: string;
  location: "magog" | "quebec";
  date: string;
  time: string;
  guests: number;
  customerName: string;
  customerEmail: string;
}

async function sb(path: string, init: RequestInit = {}) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase non configuré");
  const res = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(init.headers || {}),
    },
  });
  return res;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BookingRequest;
    const { experienceId, location, date, time, guests, customerName, customerEmail } = body;

    const exp = EXPERIENCES.find((e) => e.id === experienceId);
    if (!exp) {
      return NextResponse.json({ error: "Expérience introuvable" }, { status: 400 });
    }
    if (exp.isContactOnly || !exp.priceFrom) {
      return NextResponse.json({ error: "Cette expérience se réserve par courriel" }, { status: 400 });
    }
    if (location !== "magog" && location !== "quebec") {
      return NextResponse.json({ error: "Lieu invalide" }, { status: 400 });
    }
    if (!exp.locations.includes(location)) {
      return NextResponse.json({ error: "Lieu invalide pour cette expérience" }, { status: 400 });
    }
    if (!date || !time || !customerEmail) {
      return NextResponse.json({ error: "Informations manquantes" }, { status: 400 });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: "Date invalide" }, { status: 400 });
    }
    if (!/^\d{2}:\d{2}$/.test(time)) {
      return NextResponse.json({ error: "Heure invalide" }, { status: 400 });
    }
    const guestCount = Math.min(Math.max(Math.round(Number(guests)), 1), exp.maxGuests);

    // Capacity check: sum confirmed guests for this exact slot.
    // experienceId/location/date/time are all format-validated above (or
    // constrained to a fixed union), and still encoded here defensively.
    const existingRes = await sb(
      `experience_bookings?select=guests&experience_id=eq.${encodeURIComponent(experienceId)}&location=eq.${encodeURIComponent(location)}&booking_date=eq.${encodeURIComponent(date)}&booking_time=eq.${encodeURIComponent(time)}&status=eq.confirmed`
    );
    if (!existingRes.ok) {
      const errText = await existingRes.text();
      console.error("[experience-booking] capacity check failed", errText);
      return NextResponse.json({ error: "Erreur de vérification de disponibilité" }, { status: 500 });
    }
    const existing = (await existingRes.json()) as { guests: number }[];
    const alreadyBooked = existing.reduce((sum, r) => sum + r.guests, 0);
    if (alreadyBooked + guestCount > exp.maxGuests) {
      const remaining = Math.max(exp.maxGuests - alreadyBooked, 0);
      return NextResponse.json(
        { error: remaining > 0 ? `Il ne reste que ${remaining} place(s) pour ce créneau` : "Ce créneau est complet" },
        { status: 409 }
      );
    }

    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return NextResponse.json({ error: "Stripe non configuré" }, { status: 500 });
    }

    const unitAmount = Math.round(exp.priceFrom * 100);
    const params = new URLSearchParams({
      mode: "payment",
      success_url: `${SITE_URL}/experiences?reservation=succes`,
      cancel_url: `${SITE_URL}/experiences`,
      customer_email: customerEmail,
      "line_items[0][quantity]": String(guestCount),
      "line_items[0][price_data][currency]": "cad",
      "line_items[0][price_data][unit_amount]": String(unitAmount),
      "line_items[0][price_data][product_data][name]": `${exp.title} — ${location === "magog" ? "Magog" : "Québec"} — ${date} ${time}`,
      "metadata[experience_id]": experienceId,
      "metadata[location]": location,
      "metadata[date]": date,
      "metadata[time]": time,
      "metadata[guests]": String(guestCount),
      "metadata[customer_name]": customerName || "",
    });
    if (exp.image) {
      params.set("line_items[0][price_data][product_data][images][0]", `${SITE_URL}${encodeURI(exp.image)}`);
    }

    const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
    const stripeData = (await stripeRes.json()) as { id?: string; url?: string; error?: { message: string } };
    if (!stripeRes.ok || !stripeData.id) {
      return NextResponse.json({ error: stripeData.error?.message ?? "Erreur Stripe" }, { status: 500 });
    }

    // Write a pending booking row tied to this checkout session. The webhook
    // flips it to confirmed on payment success — pending rows don't count
    // toward capacity, so an abandoned checkout never blocks a real slot.
    const insertRes = await sb("experience_bookings", {
      method: "POST",
      body: JSON.stringify({
        experience_id: experienceId,
        location,
        booking_date: date,
        booking_time: time,
        guests: guestCount,
        customer_name: customerName || null,
        customer_email: customerEmail,
        status: "pending",
        stripe_session_id: stripeData.id,
        amount_cad: (unitAmount * guestCount) / 100,
      }),
    });
    if (!insertRes.ok) {
      const errText = await insertRes.text();
      console.error("[experience-booking] insert failed", errText);
      return NextResponse.json({ error: "Erreur lors de l'enregistrement de la réservation" }, { status: 500 });
    }

    return NextResponse.json({ url: stripeData.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[experience-booking]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
