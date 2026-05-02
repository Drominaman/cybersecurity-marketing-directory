import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured, getSupabaseClient } from "@/lib/supabase";
import { notifySubmission } from "@/lib/notify";

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_HOURS = 1;

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function escape(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot
    if (body.website_url) {
      return NextResponse.json({ success: true });
    }

    const { email, context } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const interest =
      typeof context === "string" && context.trim()
        ? context.trim()
        : "cybersecurity inbound marketing";

    const ip = getClientIp(req);

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();

      // Rate limiting: 3 submissions per hour per IP
      const windowStart = new Date(
        Date.now() - RATE_LIMIT_WINDOW_HOURS * 60 * 60 * 1000
      ).toISOString();

      const { count } = await supabase
        .from("consultation_submissions")
        .select("*", { count: "exact", head: true })
        .eq("ip_address", ip)
        .gte("created_at", windowStart);

      if (count !== null && count >= RATE_LIMIT_MAX) {
        return NextResponse.json(
          { error: "Too many submissions. Please try again later." },
          { status: 429 }
        );
      }

      const { error } = await supabase.from("consultation_submissions").insert({
        name: email.trim(),
        email: email.trim(),
        message: interest,
        ip_address: ip,
      });

      if (error) {
        console.error("Supabase insert error:", error);
        // Don't block the email send on Supabase failure.
      }
    } else {
      console.log("Consultation submission (no Supabase):", {
        email,
        interest,
        ip,
        timestamp: new Date().toISOString(),
      });
    }

    await notifySubmission({
      kind: "Consultation request",
      fromEmail: email,
      subjectDetail: interest,
      intro: `Someone requested a free ${escape(interest)} consultation.`,
      fields: {
        Email: escape(email),
        Interest: escape(interest),
        IP: escape(ip),
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send. Please try again." },
      { status: 500 }
    );
  }
}
