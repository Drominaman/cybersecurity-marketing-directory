import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured, getSupabaseClient } from "@/lib/supabase";
import { notifySubmission } from "@/lib/notify";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_HOURS = 1;

interface SubmissionData {
  agencyName?: string;
  websiteUrl?: string;
  contactEmail?: string;
  contactName?: string;
  location?: string;
  services?: string[];
  description?: string;
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
    const body: SubmissionData = await req.json();

    // Honeypot
    if (body.website_url) {
      return NextResponse.json({ success: true });
    }

    const { agencyName, websiteUrl, contactEmail, contactName, location, services, description } = body;

    if (
      !agencyName ||
      typeof agencyName !== "string" ||
      !agencyName.trim() ||
      !websiteUrl ||
      typeof websiteUrl !== "string" ||
      !websiteUrl.trim() ||
      !contactEmail ||
      typeof contactEmail !== "string"
    ) {
      return NextResponse.json(
        { error: "Agency name, website URL, and contact email are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const servicesText = services?.length ? services.join(", ") : "";
    const ip = getClientIp(req);

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();

      // Rate limiting: 5 submissions per hour per IP
      const windowStart = new Date(
        Date.now() - RATE_LIMIT_WINDOW_HOURS * 60 * 60 * 1000
      ).toISOString();

      const { count } = await supabase
        .from("agency_submissions")
        .select("*", { count: "exact", head: true })
        .eq("ip_address", ip)
        .gte("created_at", windowStart);

      if (count !== null && count >= RATE_LIMIT_MAX) {
        return NextResponse.json(
          { error: "Too many submissions. Please try again later." },
          { status: 429 }
        );
      }

      const { error } = await supabase.from("agency_submissions").insert({
        company_name: agencyName.trim(),
        website: websiteUrl.trim(),
        contact_email: contactEmail.trim(),
        contact_name: contactName?.trim() || null,
        description: description?.trim() || null,
        services: servicesText || null,
        location: location?.trim() || null,
        ip_address: ip,
      });

      if (error) {
        console.error("Supabase insert error:", error);
        // Don't block the email send on Supabase failure.
      }
    } else {
      console.log("Agency submission (no Supabase):", {
        agencyName,
        websiteUrl,
        contactEmail,
        location,
        services: servicesText,
        ip,
        timestamp: new Date().toISOString(),
      });
    }

    await notifySubmission({
      kind: "Agency submission",
      fromEmail: contactEmail,
      subjectDetail: agencyName,
      fields: {
        "Agency Name": escape(agencyName),
        Website: escape(websiteUrl),
        "Contact Email": escape(contactEmail),
        "Contact Name": contactName ? escape(contactName) : "",
        Location: location ? escape(location) : "",
        Services: servicesText ? escape(servicesText) : "",
        Description: description ? escape(description) : "",
        IP: escape(ip),
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send submission. Please try again." },
      { status: 500 }
    );
  }
}
