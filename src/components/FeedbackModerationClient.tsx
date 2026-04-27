"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Clock } from "lucide-react";

type Submission = {
  id: string;
  name: string;
  email: string;
  topic: string;
  subject: string;
  message: string;
  status: string;
  createdAt: Date;
};

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  APPROVED: "bg-[#EAF6EA] text-[#1A5C1A] border-[#C8E8C8]",
  REJECTED: "bg-red-50 text-red-600 border-red-200",
};

const TOPIC_LABELS: Record<string, string> = {
  LANDOWNERS: "Landowners",
  INVESTORS: "Investors",
  GENERAL: "General",
};

export default function FeedbackModerationClient({
  submissions,
}: {
  submissions: Submission[];
}) {
  const router = useRouter();
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "APPROVED" | "REJECTED">("PENDING");
  const [loading, setLoading] = useState<string | null>(null);

  async function moderate(id: string, action: "APPROVED" | "REJECTED") {
    setLoading(id);
    await fetch("/api/admin/feedback", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: action }),
    });
    router.refresh();
    setLoading(null);
  }

  const filtered = filter === "ALL" ? submissions : submissions.filter((s) => s.status === filter);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(["PENDING", "APPROVED", "REJECTED", "ALL"] as const).map((f) => {
          const count = f === "ALL" ? submissions.length : submissions.filter((s) => s.status === f).length;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                filter === f ? "bg-[#1A5C1A] text-white border-[#1A5C1A]" : "border-gray-300 text-gray-600 hover:border-[#2E8B2E]"
              }`}
            >
              {f === "ALL" ? "All" : f.charAt(0) + f.slice(1).toLowerCase()} ({count})
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-400 text-center py-12">No submissions in this category.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((sub) => (
            <div key={sub.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_STYLES[sub.status]}`}>
                    {sub.status === "PENDING" && <Clock size={11} className="inline mr-1" />}
                    {sub.status === "APPROVED" && <Check size={11} className="inline mr-1" />}
                    {sub.status === "REJECTED" && <X size={11} className="inline mr-1" />}
                    {sub.status.charAt(0) + sub.status.slice(1).toLowerCase()}
                  </span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                    {TOPIC_LABELS[sub.topic] ?? sub.topic}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(sub.createdAt).toLocaleDateString("en-ZA", {
                      year: "numeric", month: "short", day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <h3 className="font-semibold text-[#1A5C1A] mb-1">{sub.subject}</h3>
              <p className="text-sm text-gray-500 mb-1">
                {sub.name} — <a href={`mailto:${sub.email}`} className="text-[#2E8B2E] hover:underline">{sub.email}</a>
              </p>
              <p className="text-sm text-gray-700 mt-3 whitespace-pre-wrap leading-relaxed">
                {sub.message}
              </p>

              {sub.status === "PENDING" && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => moderate(sub.id, "APPROVED")}
                    disabled={loading === sub.id}
                    className="flex items-center gap-1.5 bg-[#1A5C1A] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#144A14] transition-colors disabled:opacity-60"
                  >
                    <Check size={14} /> Approve
                  </button>
                  <button
                    onClick={() => moderate(sub.id, "REJECTED")}
                    disabled={loading === sub.id}
                    className="flex items-center gap-1.5 border border-red-300 text-red-600 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-60"
                  >
                    <X size={14} /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
