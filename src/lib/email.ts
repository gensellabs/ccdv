import nodemailer from "nodemailer";

const TO_EMAIL = process.env.ADMIN_EMAIL ?? "info@ccdv.co.za";
const CC_EMAIL = process.env.ADMIN_EMAIL_CC ?? "theoengels@me.com";

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("[email] GMAIL_USER or GMAIL_APP_PASSWORD not set — skipping email");
    return;
  }

  await transporter.sendMail({
    from: `"CCDV Website" <${process.env.GMAIL_USER}>`,
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
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("[email] GMAIL_USER or GMAIL_APP_PASSWORD not set — skipping email");
    return;
  }

  const topicLabel: Record<string, string> = {
    LANDOWNERS: "Landowners",
    INVESTORS: "Investors",
    GENERAL: "General",
  };

  await transporter.sendMail({
    from: `"CCDV Website" <${process.env.GMAIL_USER}>`,
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
