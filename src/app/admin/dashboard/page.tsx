import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FileText, MessageSquare, Plus, LogOut } from "lucide-react";

export default async function AdminDashboardPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin");

  const [postCount, pendingFeedback, totalFeedback] = await Promise.all([
    prisma.newsPost.count(),
    prisma.feedbackSubmission.count({ where: { status: "PENDING" } }),
    prisma.feedbackSubmission.count(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin nav */}
      <nav className="bg-[#1A5C1A] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="CCDV" width={36} height={36} className="bg-white rounded-full p-0.5" />
          <span className="font-semibold">CCDV Admin</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/" className="text-[#C8E8C8] hover:text-white">View Site</Link>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className="flex items-center gap-1 text-[#C8E8C8] hover:text-white">
              <LogOut size={14} /> Sign out
            </button>
          </form>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-[#1A5C1A] mb-8">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <FileText size={20} className="text-[#2E8B2E]" />
              <span className="text-sm font-medium text-gray-500">News Posts</span>
            </div>
            <p className="text-3xl font-bold text-[#1A5C1A]">{postCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare size={20} className="text-amber-500" />
              <span className="text-sm font-medium text-gray-500">Pending Feedback</span>
            </div>
            <p className="text-3xl font-bold text-amber-600">{pendingFeedback}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare size={20} className="text-[#2E8B2E]" />
              <span className="text-sm font-medium text-gray-500">Total Feedback</span>
            </div>
            <p className="text-3xl font-bold text-[#1A5C1A]">{totalFeedback}</p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="font-semibold text-[#1A5C1A] mb-4 flex items-center gap-2">
              <FileText size={18} /> News Posts
            </h2>
            <div className="flex gap-3">
              <Link
                href="/admin/posts/new"
                className="flex items-center gap-2 bg-[#1A5C1A] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#144A14] transition-colors"
              >
                <Plus size={14} /> New Post
              </Link>
              <Link
                href="/admin/posts"
                className="flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Manage Posts
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="font-semibold text-[#1A5C1A] mb-4 flex items-center gap-2">
              <MessageSquare size={18} /> Feedback Moderation
            </h2>
            {pendingFeedback > 0 && (
              <p className="text-sm text-amber-600 mb-3 font-medium">
                ⚠ {pendingFeedback} submission{pendingFeedback !== 1 ? "s" : ""} awaiting review
              </p>
            )}
            <Link
              href="/admin/feedback"
              className="inline-flex items-center gap-2 bg-[#1A5C1A] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#144A14] transition-colors"
            >
              Review Feedback
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
