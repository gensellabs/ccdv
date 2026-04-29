import { Resend } from "resend";

const TO_EMAIL = process.env.ADMIN_EMAIL ?? "info@ccdv.co.za";
const CC_EMAIL = process.env.ADMIN_EMAIL_CC ?? "theoengels@me.com";
const FROM_EMAIL = process.env.FROM_EMAIL ?? "onboarding@resend.dev";

function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const resend = getResend();
  if (!resend) return;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    cc: CC_EMAIL,
    subject: `New contact form submission from ${data.name}`,
    html: `
      <h2>New Contact Submission — CCDV</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${data.message}</p>
    `,
  });
}

export async function sendFeedbackNotification(data: {
  name: string;
  email: string;
  topic: string;
  subject: string;
  message: string;
}) {
  const resend = getResend();
  if (!resend) return;

  const topicLabel: Record<string, string> = {
    LANDOWNERS: "Landowners",
    INVESTORS: "Investors",
    GENERAL: "General",
  };

  await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    cc: CC_EMAIL,
    subject: `New community feedback [${topicLabel[data.topic] ?? data.topic}] — awaiting moderation`,
    html: `
      <h2>New Feedback Submission — Awaiting Moderation</h2>
      <p><strong>Topic:</strong> ${topicLabel[data.topic] ?? data.topic}</p>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${data.message}</p>
      <hr>
      <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/feedback">Review in Admin Panel →</a></p>
    `,
  });
}
