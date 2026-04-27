import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PostEditor from "@/components/PostEditor";
import { ArrowLeft } from "lucide-react";

type Props = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Props) {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin");

  const { id } = await params;
  const post = await prisma.newsPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#1A5C1A] text-white px-6 py-4 flex items-center gap-4">
        <Link href="/admin/posts" className="text-[#C8E8C8] hover:text-white">
          <ArrowLeft size={18} />
        </Link>
        <span className="font-semibold">Edit Post</span>
      </nav>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-[#1A5C1A] mb-8">Edit Post</h1>
        <PostEditor
          initialPost={{
            id: post.id,
            title: post.title,
            slug: post.slug,
            summary: post.summary,
            content: post.content,
            published: post.published,
          }}
        />
      </div>
    </div>
  );
}
