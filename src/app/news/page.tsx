import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ArrowRight, Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: "News & Updates",
  description: "The latest news, project updates, and announcements from CCDV.",
};

export default async function NewsPage() {
  const posts = await prisma.newsPost
    .findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      select: { id: true, title: true, summary: true, slug: true, publishedAt: true },
    })
    .catch(() => []);

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#2E8B2E] font-semibold uppercase text-sm tracking-widest mb-2">
            Latest from CCDV
          </p>
          <h1 className="text-4xl font-bold text-[#1A5C1A] mb-4">News & Updates</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Project progress, milestones, and announcements from Carbon Credit
            Development Ventures.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Newspaper size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No posts yet</p>
            <p className="text-sm mt-1">Check back soon for updates.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/news/${post.slug}`}
                className="block bg-white rounded-xl border border-[#C8E8C8] p-6 shadow-sm hover:shadow-md hover:border-[#2E8B2E] transition-all group"
              >
                <p className="text-xs text-gray-400 mb-2">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("en-ZA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </p>
                <h2 className="text-xl font-bold text-[#1A5C1A] group-hover:text-[#144A14] mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">{post.summary}</p>
                <span className="inline-flex items-center gap-1 text-[#2E8B2E] font-semibold text-sm group-hover:text-[#1A5C1A]">
                  Read more <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
