import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { EXPERIENCES, DISTILLERIES } from "@/content/experiences-data";
import { createCalendarEvent } from "@/lib/google-calendar";

export const runtime = "nodejs";

async function sb(path: string, init: RequestInit = {}) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase non configuré");
  return fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
}

// Verifies Stripe's webhook signature by hand (no Stripe SDK in this repo).
// Header format: "t=<timestamp>,v1=<hex hmac>". Signed payload is "<t>.<rawBody>".
function verifyStripeSignature(rawBody: string, signatureHeader: string, secret: string): boolean {
  const parts = Object.fromEntries(
    signatureHeader.split(",").map((p) => {
      const [k, v] = p.split("=");
      return [k, v];
    })
  );
  const timestamp = parts.t;
  const expectedSig = parts.v1;
  if (!timestamp || !expectedSig) return false;

  // Reject stale/replayed deliveries — same 5-minute tolerance Stripe's own SDK uses.
  const tsSec = parseInt(timestamp, 10);
  if (!Number.isFinite(tsSec)) return false;
  const ageSec = Math.floor(Date.now() / 1000) - tsSec;
  if (ageSec > 300 || ageSec < -300) return false;

  const signedPayload = `${timestamp}.${rawBody}`;
  const computedSig = crypto.createHmac("sha256", secret).update(signedPayload, "utf8").digest("hex");

  const a = Buffer.from(computedSig, "hex");
  const b = Buffer.from(expectedSig, "hex");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  const signature = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  if (!secret || !signature) {
    console.error("[stripe-webhook] missing secret or signature header");
    return NextResponse.json({ error: "Webhook non configuré" }, { status: 500 });
  }
  if (!verifyStripeSignature(rawBody, signature, secret)) {
    console.error("[stripe-webhook] signature verification failed");
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const sessionId = session.id;

    // Only touch experience bookings — the boutique checkout uses the same
    // Stripe account but has no matching row here, so this simply no-ops for it.
    const res = await sb(`experience_bookings?stripe_session_id=eq.${sessionId}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "confirmed" }),
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error("[stripe-webhook] failed to confirm booking", sessionId, errText);
      return NextResponse.json({ error: "Erreur de confirmation" }, { status: 500 });
    }

    // Best-effort Google Calendar sync — a failure here must not fail the
    // webhook response, the payment is already confirmed regardless.
    try {
      const meta = session.metadata ?? {};
      const exp = EXPERIENCES.find((e) => e.id === meta.experience_id);
      if (exp && meta.date && meta.time) {
        const distillery = DISTILLERIES.find((d) => d.id === meta.location);
        const [h, m] = meta.time.split(":").map(Number);
        const totalEndMinutes = h * 60 + m + exp.durationMinutes;
        const endTime = `${String(Math.floor(totalEndMinutes / 60) % 24).padStart(2, "0")}:${String(
          totalEndMinutes % 60
        ).padStart(2, "0")}`;
        const customerEmail = session.customer_details?.email ?? session.customer_email ?? "";

        await createCalendarEvent({
          summary: `${exp.title} — ${distillery?.shortName ?? meta.location} (${meta.guests ?? "?"} pers.)`,
          description: [
            `Client: ${meta.customer_name || "N/A"}`,
            `Courriel: ${customerEmail}`,
            `Invités: ${meta.guests ?? "?"}`,
            `Session Stripe: ${sessionId}`,
          ].join("\n"),
          location: distillery?.fullAddress ?? "",
          startDateTime: `${meta.date}T${meta.time}:00`,
          endDateTime: `${meta.date}T${endTime}:00`,
          timeZone: "America/Toronto",
        });
      }
    } catch (calErr) {
      console.error("[stripe-webhook] google calendar sync failed", sessionId, calErr);
    }
  }

  return NextResponse.json({ received: true });
}
