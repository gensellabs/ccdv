import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await prisma.contactSubmission.create({
      data: { name, email, phone: phone || null, message },
    });

    await sendContactNotification({ name, email, phone, message }).catch((err) => {
      console.error("[contact] email send failed:", err);
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] handler error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
