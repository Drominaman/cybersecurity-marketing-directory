import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured, getSupabaseClient } from "@/lib/supabase";
import { notifySubmission } from "@/lib/notify";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_HOURS = 1;

const REASON_LABELS: Record<string, string> = {
  correction: "Data correction",
  "featured-listing": "Featured listing inquiry",
  sponsorship: "Sponsorship & partnerships",
  general: "General question",
};

interface ContactData {
  name?: string;
  email?: string;
  reason?: string;
  message?: string;
  website_url?: string; // honeypot
}

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
    const body: ContactData = await req.json();

    // Honeypot
    if (body.website_url) {
      return NextResponse.json({ success: true });
    }

    const { name, email, reason, message } = body;

    if (
      !name ||
      typeof name !== "string" ||
      !name.trim() ||
      !email ||
      typeof email !== "string" ||
      !message ||
      typeof message !== "string" ||
      !message.trim()
    ) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
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

    const reasonLabel = (reason && REASON_LABELS[reason]) || REASON_LABELS.general;
    const ip = getClientIp(req);

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();

      // Rate limiting: 5 submissions per hour per IP
      const windowStart = new Date(
        Date.now() - RATE_LIMIT_WINDOW_HOURS * 60 * 60 * 1000
      ).toISOString();

      const { count } = await supabase
        .from("contact_submissions")
        .select("*", { count: "exact", head: true })
        .eq("ip_address", ip)
        .gte("created_at", windowStart);

      if (count !== null && count >= RATE_LIMIT_MAX) {
        return NextResponse.json(
          { error: "Too many submissions. Please try again later." },
          { status: 429 }
        );
      }

      const { error } = await supabase.from("contact_submissions").insert({
        name: name.trim(),
        email: email.trim(),
        reason: reasonLabel,
        message: message.trim(),
        ip_address: ip,
      });

      if (error) {
        console.error("Supabase insert error:", error);
        // Don't block the email send on Supabase failure.
      }
    } else {
      console.log("Contact submission (no Supabase):", {
        name,
        email,
        reason: reasonLabel,
        ip,
        timestamp: new Date().toISOString(),
      });
    }

    await notifySubmission({
      kind: "Contact form",
      fromEmail: email,
      subjectDetail: reasonLabel,
      fields: {
        Name: escape(name),
        Email: escape(email),
        Reason: escape(reasonLabel),
        Message: escape(message),
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
