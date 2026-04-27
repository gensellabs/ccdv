import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/auth";
import PostEditor from "@/components/PostEditor";
import { ArrowLeft } from "lucide-react";

export default async function NewPostPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin");

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#1A5C1A] text-white px-6 py-4 flex items-center gap-4">
        <Link href="/admin/posts" className="text-[#C8E8C8] hover:text-white">
          <ArrowLeft size={18} />
        </Link>
        <span className="font-semibold">New Post</span>
      </nav>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-[#1A5C1A] mb-8">Create New Post</h1>
        <PostEditor />
      </div>
    </div>
  );
}
