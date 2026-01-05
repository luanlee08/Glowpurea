"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import {
  getPublicBlogs,
  getRecentBlogs,
  BlogPublic,
} from "@/services/blog.service";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPublic[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<BlogPublic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const listRes = await getPublicBlogs({
          page: 1,
          pageSize: 6,
        });

        const recentRes = await getRecentBlogs(3);

        setBlogs(listRes.data);
        setRecentBlogs(recentRes);
      } catch (err) {
        console.error("Load blog error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="bg-[#fafafa] min-h-screen">
      <Header />

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT – BLOG LIST */}
          <div className="lg:col-span-8 space-y-8">
            {loading && <p>Đang tải dữ liệu...</p>}

            {!loading &&
              blogs.map((post) => (
                <article
                  key={post.blogPostId}
                  className="flex gap-6 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
                >
                  {/* Thumbnail */}
                  <div className="w-40 h-40 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={post.blogThumbnail || "/images/no-image.png"}
                      alt={post.blogTitle}
                      className="w-full h-full object-cover"
                    />

                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <span className="inline-block mb-2 text-xs font-semibold px-3 py-1 rounded-full bg-orange-100 text-orange-600">
                        {post.blogCategory}
                      </span>

                      <h3 className="text-xl font-bold text-gray-900 hover:text-orange-500 transition">
                        {post.blogTitle}
                      </h3>

                      <p className="text-gray-500 mt-2 line-clamp-2">
                        {post.blogExcerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <span>{post.authorEmail}</span>
                        <span>
                          {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                        </span>
                      </div>

                      <Link
                        href={`/blog/${post.blogPostId}`}
                        className="text-orange-500 font-medium hover:underline"
                      >
                        Đọc tiếp →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}

            {!loading && blogs.length === 0 && (
              <p className="text-gray-500">Chưa có bài viết nào</p>
            )}
          </div>

          {/* RIGHT – SIDEBAR */}
          <aside className="lg:col-span-4 space-y-6">

            {/* SEARCH (UI trước, logic sau) */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Nhập từ khóa..."
                  className="flex-1 border border-gray-200 rounded-l-lg px-4 py-2 focus:outline-none"
                />
                <button className="bg-orange-500 text-white px-4 rounded-r-lg">
                  🔍
                </button>
              </div>
            </div>

            {/* CATEGORY (static – sau này nối API) */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="font-bold text-lg mb-4 border-b pb-2">
                Chuyên mục
              </h4>

              <ul className="space-y-3 text-sm">
                <li className="flex justify-between hover:text-orange-500 cursor-pointer">
                  <span>Tất cả</span>
                </li>
                <li className="flex justify-between">
                  <span>Tin tức</span>
                </li>
                <li className="flex justify-between">
                  <span>Hướng dẫn</span>
                </li>
              </ul>
            </div>

            {/* RECENT POSTS */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="font-bold text-lg mb-4 border-b pb-2">
                Bài viết gần đây
              </h4>

              <ul className="space-y-4">
                {recentBlogs.map((post) => (
                  <li key={post.blogPostId} className="flex gap-4">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={post.blogThumbnail || "/images/no-image.png"}
                        alt={post.blogTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col justify-between">
                      <p className="text-sm font-semibold line-clamp-2">
                        {post.blogTitle}
                      </p>

                      <span className="text-xs text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
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
