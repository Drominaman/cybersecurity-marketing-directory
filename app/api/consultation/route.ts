import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, context } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const interest = context || 'cybersecurity inbound marketing';

    const { error } = await resend.emails.send({
      from: 'Cybersecurity Marketing Agencies <onboarding@resend.dev>',
      to: 'robbie@contentvisit.com',
      subject: `New Consultation Request: ${interest}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="border-bottom: 2px solid #000; padding-bottom: 8px;">New Consultation Request</h2>
          <p>Someone requested a free <strong>${interest}</strong> consultation.</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Interest</td>
              <td style="padding: 8px 0;">${interest}</td>
            </tr>
          </table>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send. Please try again.' }, { status: 500 });
  }
}
