"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";

import {
  getBlogDetail,
  getRecentBlogs,
} from "@/services/blog.service";

/* ================= TYPES ================= */

interface BlogDetail {
  blogPostId: number;
  blogTitle: string;
  blogContent: string;
  blogThumbnail: string | null;
  blogCategory: string;
  authorEmail: string;
  createdAt: string; // yyyy-MM-dd hoặc ISO
}

interface BlogRecent {
  blogPostId: number;
  blogTitle: string;
  createdAt: string;
}

/* ================= COMPONENT ================= */

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<BlogRecent[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  /* ===== FIX HYDRATION ===== */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* ===== FETCH DATA ===== */
  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [detail, recent] = await Promise.all([
          getBlogDetail(Number(slug)),
          getRecentBlogs(5),
        ]);

        setBlog(detail);
        setRecentBlogs(recent);
      } catch (error) {
        console.error("Load blog detail error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  /* ===== STATES ===== */

  if (!mounted) return null;

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-600">
        Đang tải bài viết...
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-600">
        Không tìm thấy bài viết
      </main>
    );
  }

  /* ================= RENDER ================= */

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <Header />

      {/* ===== BREADCRUMB ===== */}
      <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-orange-500">Trang chủ</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-orange-500">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">
          {blog.blogTitle}
        </span>
      </div>

      {/* ===== CONTENT ===== */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ===== MAIN ===== */}
          <div className="lg:col-span-8">
            <article className="bg-white rounded-xl shadow-sm p-8 space-y-6">

              <Badge className="bg-orange-100 text-orange-600">
                {blog.blogCategory}
              </Badge>

              <h1 className="text-3xl font-bold text-gray-900">
                {blog.blogTitle}
              </h1>

              <div className="flex flex-wrap gap-6 text-sm text-gray-500 border-b pb-4">
                <span>👤 {blog.authorEmail}</span>
                <span>📅 {blog.createdAt.slice(0, 10)}</span>
              </div>

              {blog.blogThumbnail && (
                <img
                  src={blog.blogThumbnail}
                  alt={blog.blogTitle}
                  className="w-full rounded-xl object-cover max-h-[420px]"
                />
              )}

              <div
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: blog.blogContent,
                }}
              />
            </article>
          </div>

          {/* ===== SIDEBAR ===== */}
          <aside className="lg:col-span-4 space-y-6">

            {/* RECENT BLOGS */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold mb-4">
                🕒 Bài viết gần đây
              </h3>

              <ul className="space-y-4">
                {recentBlogs.map((item) => (
                  <li key={item.blogPostId}>
                    <Link
                      href={`/blog/${item.blogPostId}`}
                      className="block hover:text-orange-500"
                    >
                      <p className="text-sm font-medium line-clamp-2">
                        {item.blogTitle}
                      </p>
                      <span className="text-xs text-gray-500">
                        {item.createdAt.slice(0, 10)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
