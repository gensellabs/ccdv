import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendFeedbackNotification } from "@/lib/email";

type FeedbackTopic = "LANDOWNERS" | "INVESTORS" | "GENERAL";

const VALID_TOPICS: FeedbackTopic[] = ["LANDOWNERS", "INVESTORS", "GENERAL"];

export async function POST(req: NextRequest) {
  try {
    const { name, email, topic, subject, message } = await req.json();

    if (!name || !email || !topic || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!VALID_TOPICS.includes(topic as FeedbackTopic)) {
      return NextResponse.json({ error: "Invalid topic" }, { status: 400 });
    }

    await prisma.feedbackSubmission.create({
      data: {
        name,
        email,
        topic: topic as FeedbackTopic,
        subject,
        message,
        status: "PENDING",
      },
    });

    await sendFeedbackNotification({ name, email, topic, subject, message }).catch(() => {
      // Email failure is non-fatal
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
