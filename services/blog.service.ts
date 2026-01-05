import axios from "axios";
import { API_ENDPOINTS, API_BASE } from "@/configs/api-configs";

/* ================= TYPES ================= */

export interface BlogPublic {
  blogPostId: number;
  blogTitle: string;
  blogExcerpt: string;
  blogThumbnail: string | null;
  blogCategory: string;
  authorEmail: string;
  createdAt: string;
}
export interface BlogDetail {
  blogPostId: number;
  blogTitle: string;
  blogContent: string;
  blogThumbnail: string | null;
  blogCategory: string;
  authorEmail: string;
  createdAt: string;
}
/* ================= API ================= */

export const getPublicBlogs = async (params: {
  page?: number;
  pageSize?: number;
  keyword?: string;
  categoryId?: number;
}) => {
  const res = await axios.get(API_ENDPOINTS.BLOGS, { params });

  return {
    ...res.data,
    data: res.data.data.map((b: BlogPublic) => ({
      ...b,
      blogThumbnail: b.blogThumbnail
        ? `${API_BASE}${b.blogThumbnail}`
        : null,
    })),
  };
};

export const getRecentBlogs = async (limit = 5) => {
  const res = await axios.get(API_ENDPOINTS.BLOG_RECENT, {
    params: { limit },
  });

  return res.data.map((b: BlogPublic) => ({
    ...b,
    blogThumbnail: b.blogThumbnail
      ? `${API_BASE}${b.blogThumbnail}`
      : null,
  }));
};
export const getBlogDetail = async (id: number) => {
  const res = await axios.get<BlogDetail>(
    API_ENDPOINTS.BLOG_DETAIL(id)
  );

  const b = res.data;

  return {
    ...b,
    blogThumbnail: b.blogThumbnail
      ? `${API_BASE}${b.blogThumbnail}`
      : null,
  };
};
