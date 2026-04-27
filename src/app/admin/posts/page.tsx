import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Plus, Edit, ArrowLeft } from "lucide-react";

export default async function AdminPostsPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin");

  const posts = await prisma.newsPost.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, published: true, publishedAt: true, createdAt: true },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#1A5C1A] text-white px-6 py-4 flex items-center gap-4">
        <Link href="/admin/dashboard" className="text-[#C8E8C8] hover:text-white">
          <ArrowLeft size={18} />
        </Link>
        <span className="font-semibold">News Posts</span>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#1A5C1A]">All Posts</h1>
          <Link
            href="/admin/posts/new"
            className="flex items-center gap-2 bg-[#1A5C1A] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#144A14]"
          >
            <Plus size={14} /> New Post
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-gray-400 text-center py-12">No posts yet. Create your first post.</p>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between shadow-sm"
              >
                <div>
                  <p className="font-semibold text-[#1A5C1A]">{post.title}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Created {new Date(post.createdAt).toLocaleDateString("en-ZA")}
                    {post.publishedAt &&
                      ` · Published ${new Date(post.publishedAt).toLocaleDateString("en-ZA")}`}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      post.published
                        ? "bg-[#EAF6EA] text-[#1A5C1A]"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="flex items-center gap-1 text-sm text-[#2E8B2E] font-medium hover:text-[#1A5C1A]"
                  >
                    <Edit size={14} /> Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
