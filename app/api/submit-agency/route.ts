import { Resend } from 'resend';
import { NextResponse } from 'next/server';

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

interface SubmissionData {
  agencyName: string;
  websiteUrl: string;
  contactEmail: string;
  location?: string;
  services?: string[];
  description?: string;
}

export async function POST(request: Request) {
  try {
    const body: SubmissionData = await request.json();

    if (!body.agencyName || !body.websiteUrl || !body.contactEmail) {
      return NextResponse.json(
        { error: 'Agency name, website URL, and contact email are required.' },
        { status: 400 }
      );
    }

    const servicesText = body.services?.length
      ? body.services.join(', ')
      : 'Not specified';

    const { error } = await getResend().emails.send({
      from: 'Cybersecurity Marketing Agencies <onboarding@resend.dev>',
      to: 'robbie@contentvisit.com',
      subject: `Agency Submission: ${body.agencyName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="border-bottom: 2px solid #000; padding-bottom: 8px;">New Agency Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; vertical-align: top; width: 140px;">Agency Name</td>
              <td style="padding: 8px 0;">${body.agencyName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Website</td>
              <td style="padding: 8px 0;"><a href="${body.websiteUrl}">${body.websiteUrl}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Contact Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${body.contactEmail}">${body.contactEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Location</td>
              <td style="padding: 8px 0;">${body.location || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Services</td>
              <td style="padding: 8px 0;">${servicesText}</td>
            </tr>
          </table>
          ${body.description ? `
            <h3 style="margin-top: 24px; border-bottom: 1px solid #ccc; padding-bottom: 4px;">Description</h3>
            <p style="white-space: pre-wrap;">${body.description}</p>
          ` : ''}
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to send submission. Please try again.' },
      { status: 500 }
    );
  }
}
