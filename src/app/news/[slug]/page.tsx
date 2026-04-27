import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.newsPost
    .findUnique({ where: { slug, published: true }, select: { title: true, summary: true } })
    .catch(() => null);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.summary };
}

export default async function NewsPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.newsPost
    .findUnique({ where: { slug, published: true } })
    .catch(() => null);

  if (!post) notFound();

  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-[#2E8B2E] font-medium hover:text-[#1A5C1A] mb-8 text-sm"
        >
          <ArrowLeft size={16} /> Back to News
        </Link>

        <article>
          <header className="mb-8">
            <p className="text-xs text-gray-400 mb-3">
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-ZA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </p>
            <h1 className="text-4xl font-bold text-[#1A5C1A] mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed border-b border-[#EAF6EA] pb-6">
              {post.summary}
            </p>
          </header>

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <div className="mt-12 pt-8 border-t border-[#EAF6EA]">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-[#2E8B2E] font-medium hover:text-[#1A5C1A] text-sm"
          >
            <ArrowLeft size={16} /> All news
          </Link>
        </div>
      </div>
    </div>
  );
}
