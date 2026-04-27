"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type Post = {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  published: boolean;
};

export default function PostEditor({ initialPost }: { initialPost?: Post }) {
  const router = useRouter();
  const [form, setForm] = useState<Post>(
    initialPost ?? { title: "", slug: "", summary: "", content: "", published: false }
  );
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  function slugify(str: string) {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }

  function handleTitleChange(title: string) {
    setForm((f) => ({
      ...f,
      title,
      slug: f.slug || slugify(title),
    }));
  }

  async function handleSave(publish: boolean) {
    setSaving(true);
    setError("");
    try {
      const body = { ...form, published: publish };
      const url = form.id ? `/api/admin/posts/${form.id}` : "/api/admin/posts";
      const method = form.id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        router.push("/admin/posts");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? "Save failed.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!form.id) return;
    if (!confirm("Delete this post permanently?")) return;
    setDeleting(true);
    await fetch(`/api/admin/posts/${form.id}`, { method: "DELETE" });
    router.push("/admin/posts");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B2E]"
            placeholder="Post title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B2E] font-mono"
            placeholder="url-friendly-slug"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Summary *</label>
        <textarea
          rows={2}
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B2E] resize-none"
          placeholder="One or two sentence summary (shown on news index page)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
        <div data-color-mode="light">
          <MDEditor
            value={form.content}
            onChange={(v) => setForm({ ...form, content: v ?? "" })}
            height={400}
            preview="live"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Use Markdown: **bold**, *italic*, ## Heading, - list, [link text](url)
        </p>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          onClick={() => handleSave(true)}
          disabled={saving}
          className="bg-[#1A5C1A] text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-[#144A14] transition-colors disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save & Publish"}
        </button>
        <button
          onClick={() => handleSave(false)}
          disabled={saving}
          className="border border-gray-300 text-gray-700 font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-60"
        >
          Save as Draft
        </button>
        {form.id && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="border border-red-300 text-red-600 font-semibold px-6 py-2.5 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-60 ml-auto"
          >
            {deleting ? "Deleting..." : "Delete Post"}
          </button>
        )}
      </div>
    </div>
  );
}
