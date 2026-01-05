export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://localhost:63731";

export const API_ENDPOINTS = {
  // ===== AUTH =====
  AUTH: {
    REGISTER: `${API_BASE}/api/auth/register`,
    VERIFY_OTP: `${API_BASE}/api/auth/verify-otp`,
    LOGIN: `${API_BASE}/api/auth/login`,
    ME: `${API_BASE}/api/auth/me`,
    UPLOAD_AVATAR: `${API_BASE}/api/auth/avatar`,
  },

  BLOGS: `${API_BASE}/api/blogs`,
  BLOG_RECENT: `${API_BASE}/api/blogs/recent`,
  BLOG_DETAIL: (id: number) => `${API_BASE}/api/blogs/${id}`,
};
