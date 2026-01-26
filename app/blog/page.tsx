"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getBlogCategories, BlogCategory } from "@/services/blog-category.service";
import Link from "next/link";

import {
  getPublicBlogs,
  getRecentBlogs,
  BlogPublic,
} from "@/services/blog.service";

export default function BlogPage() {
  /* ================= STATE ================= */
  const [blogs, setBlogs] = useState<BlogPublic[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<BlogPublic[]>([]);
  const [loading, setLoading] = useState(true);
  // filter
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  // search
  const [keyword, setKeyword] = useState("");
  const [searchInput, setSearchInput] = useState("");


  // pagination
  const [page, setPage] = useState(1);
  const pageSize = 3;
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / pageSize);

  /* ================= PAGINATION WINDOW ================= */
  const maxVisiblePages = 5;

  const startPage = Math.max(
    1,
    page - Math.floor(maxVisiblePages / 2)
  );

  const endPage = Math.min(
    totalPages,
    startPage + maxVisiblePages - 1
  );
  const handleSelectCategory = (categoryId: number | null) => {
    setSelectedCategoryId(categoryId);
    setPage(1);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getBlogCategories();
        setCategories(data);
      } catch (err) {
        console.error("Load blog categories error", err);
      }
    };

    fetchCategories();
  }, []);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const listRes = await getPublicBlogs({
          page,
          pageSize,
          keyword: keyword || undefined,      // nếu có search
          categoryId: selectedCategoryId ?? undefined,
        });

        const recentRes = await getRecentBlogs(3);

        setBlogs(listRes.data);
        setTotal(listRes.total);
        setRecentBlogs(recentRes);
      } catch (err) {
        console.error("Load blog error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, keyword, selectedCategoryId]);



  /* ================= RENDER ================= */
  return (
    <main className="bg-[#fafafa] min-h-screen">
    <Header onSearch={setKeyword} />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ================= LEFT – BLOG LIST ================= */}
          <div className="lg:col-span-8 space-y-8">
            {loading && <p>Đang tải dữ liệu...</p>}

            {!loading &&
              blogs.map((post) => (
                <article
                  key={post.blogPostId}
                  className="flex gap-6 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="w-40 h-40 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={post.blogThumbnail || "/images/no-image.png"}
                      alt={post.blogTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <span className="inline-block mb-2 text-xs font-semibold px-3 py-1 rounded-full bg-orange-100 text-orange-600">
                        {post.blogCategory}
                      </span>

                      <h3 className="text-xl font-bold text-gray-900 hover:text-orange-500">
                        {post.blogTitle}
                      </h3>

                      <p
                        className="text-gray-500 mt-2 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: post.blogExcerpt }}
                      />
                    </div>

                    <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                      <div className="flex gap-4">
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

            {/* ================= PAGINATION ================= */}
            {!loading && totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">

                {/* PREV */}
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-3 py-2 rounded-lg border disabled:opacity-40"
                >
                  ←
                </button>

                {/* FIRST */}
                {startPage > 1 && (
                  <>
                    <button
                      onClick={() => setPage(1)}
                      className="px-4 py-2 rounded-lg border"
                    >
                      1
                    </button>
                    <span>...</span>
                  </>
                )}

                {/* WINDOW */}
                {Array.from(
                  { length: endPage - startPage + 1 },
                  (_, i) => startPage + i
                ).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-4 py-2 rounded-lg border
                      ${page === p
                        ? "bg-orange-500 text-white"
                        : "bg-white hover:bg-orange-100"
                      }`}
                  >
                    {p}
                  </button>
                ))}

                {/* LAST */}
                {endPage < totalPages && (
                  <>
                    <span>...</span>
                    <button
                      onClick={() => setPage(totalPages)}
                      className="px-4 py-2 rounded-lg border"
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                {/* NEXT */}
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-3 py-2 rounded-lg border disabled:opacity-40"
                >
                  →
                </button>
              </div>
            )}
          </div>
          {/* ================= RIGHT – SIDEBAR ================= */}
          <aside className="lg:col-span-4 space-y-6">

            {/* SEARCH (UI only) */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Nhập từ khóa..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setKeyword(searchInput);
                      setPage(1);
                    }
                  }}
                  className="flex-1 border border-gray-200 rounded-l-lg px-4 py-2 focus:outline-none"
                />
                <button
                  onClick={() => {
                    setKeyword(searchInput);
                    setPage(1);
                  }}
                  className="bg-orange-500 text-white px-4 rounded-r-lg"
                >
                  🔍
                </button>
              </div>
            </div>


            {/* CATEGORY (static) */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="font-bold text-lg mb-4 border-b pb-2">
                Chuyên mục
              </h4>

              <ul className="space-y-3 text-sm">
                {/* ALL */}
                <li
                  onClick={() => handleSelectCategory(null)}
                  className={`cursor-pointer hover:text-orange-500
        ${selectedCategoryId === null ? "text-orange-500 font-semibold" : ""}
      `}
                >
                  Tất cả
                </li>

                {/* DYNAMIC CATEGORY */}
                {categories.map((cat) => (
                  <li
                    key={cat.blogCategoryId}
                    onClick={() => handleSelectCategory(cat.blogCategoryId)}
                    className={`cursor-pointer hover:text-orange-500
          ${selectedCategoryId === cat.blogCategoryId
                        ? "text-orange-500 font-semibold"
                        : ""
                      }
        `}
                  >
                    {cat.blogCategoryName}
                  </li>
                ))}
              </ul>
            </div>


            {/* RECENT POSTS */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="font-bold text-lg mb-4 border-b pb-2">
                Bài viết gần đây
              </h4>

              <ul className="space-y-4">
                {recentBlogs.map((post) => (
                  <li key={post.blogPostId}>
                    <Link
                      href={`/blog/${post.blogPostId}`}
                      className="flex gap-4 group"
                    >
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={post.blogThumbnail || "/images/no-image.png"}
                          alt={post.blogTitle}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex flex-col justify-between">
                        <p className="text-sm font-semibold line-clamp-2 group-hover:text-orange-500 transition">
                          {post.blogTitle}
                        </p>

                        <span className="text-xs text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
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
