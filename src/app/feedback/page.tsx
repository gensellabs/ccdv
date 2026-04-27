"use client";

import { useState } from "react";
import { prisma } from "@/lib/prisma";
import { Send } from "lucide-react";

const TOPICS = [
  {
    value: "LANDOWNERS",
    label: "Landowners",
    description: "Discussions about land partnerships, restoration agreements, and property participation.",
  },
  {
    value: "INVESTORS",
    label: "Investors",
    description: "Questions and conversations about investment opportunities, carbon credit returns, and project financing.",
  },
  {
    value: "GENERAL",
    label: "General",
    description: "General feedback, comments, questions about Spekboom, CCDV, or the carbon market.",
  },
];

export default function FeedbackPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "GENERAL",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", topic: "GENERAL", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#2E8B2E] font-semibold uppercase text-sm tracking-widest mb-2">
            Have Your Say
          </p>
          <h1 className="text-4xl font-bold text-[#1A5C1A] mb-4">Community Feedback</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Share your thoughts, ask questions, or start a conversation. All submissions
            are reviewed before being published to ensure constructive dialogue.
          </p>
        </div>

        {/* Topics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {TOPICS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setForm({ ...form, topic: t.value })}
              className={`text-left rounded-xl p-4 border-2 transition-all ${
                form.topic === t.value
                  ? "border-[#2E8B2E] bg-[#EAF6EA]"
                  : "border-gray-200 hover:border-[#4DB84D]"
              }`}
            >
              <p className="font-semibold text-[#1A5C1A] mb-1">{t.label}</p>
              <p className="text-xs text-gray-500">{t.description}</p>
            </button>
          ))}
        </div>

        {status === "sent" ? (
          <div className="bg-[#EAF6EA] border border-[#2E8B2E] rounded-xl p-10 text-center">
            <div className="text-4xl mb-3">🌿</div>
            <h3 className="font-bold text-[#1A5C1A] text-xl mb-2">Thank You!</h3>
            <p className="text-gray-600">
              Your submission has been received and is awaiting moderation. We aim to
              review all submissions within 2 business days.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 bg-white rounded-2xl border border-[#C8E8C8] p-8 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B2E] focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B2E] focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Topic <span className="text-red-500">*</span>
              </label>
              <select
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B2E] focus:border-transparent bg-white"
              >
                {TOPICS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B2E] focus:border-transparent"
                placeholder="Brief subject line"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B2E] focus:border-transparent resize-none"
                placeholder="Share your thoughts, questions, or feedback..."
              />
            </div>

            <p className="text-xs text-gray-400">
              Submissions are reviewed before publication. Please keep comments
              respectful and constructive. Your email will not be published.
            </p>

            {status === "error" && (
              <p className="text-red-600 text-sm">
                Something went wrong. Please try again or contact us directly.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full flex items-center justify-center gap-2 bg-[#1A5C1A] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#144A14] transition-colors disabled:opacity-60"
            >
              <Send size={16} />
              {status === "sending" ? "Submitting..." : "Submit for Review"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
