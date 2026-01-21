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

  // ===== PROFILE (TÁCH RIÊNG – RẤT QUAN TRỌNG) =====
  PROFILE: {
    ME: `${API_BASE}/api/profile/me`,            // ✅ GET / PUT
    UPLOAD_AVATAR: `${API_BASE}/api/profile/avatar`, // ✅ POST
  },

  BLOGS: `${API_BASE}/api/blogs`,
  BLOG_RECENT: `${API_BASE}/api/blogs/recent`,
  BLOG_DETAIL: (id: number) => `${API_BASE}/api/blogs/${id}`,

  USER_PRODUCTS: `${API_BASE}/api/user/products`,   // ✅ đúng
  USER_PRODUCT_DETAIL: (id: number) =>
    `${API_BASE}/api/public/products/${id}`,        // ✅ đúng

  CART: {
    GET: `${API_BASE}/api/cart`,
    ADD: `${API_BASE}/api/cart/add`,
    UPDATE_ITEM: (id: number) => `${API_BASE}/api/cart/item/${id}`,
    REMOVE_ITEM: (id: number) => `${API_BASE}/api/cart/item/${id}`,
  },
  // ===== ADDRESS =====
  ADDRESS: {
    LIST: `${API_BASE}/api/addresses`,            // GET: lấy danh sách địa chỉ
    CREATE: `${API_BASE}/api/addresses`,          // POST: thêm địa chỉ
    UPDATE: (id: number) => `${API_BASE}/api/addresses/${id}`, // PUT
    DELETE: (id: number) => `${API_BASE}/api/addresses/${id}`, // DELETE
    SET_DEFAULT: (id: number) =>
      `${API_BASE}/api/addresses/${id}/default`, // (OPTIONAL - nâng cao)
  },

};
