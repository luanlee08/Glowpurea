const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://localhost:63731";

export const API_URL = {
  AUTH: {
    REGISTER: `${API_BASE}/api/auth/register`,
    VERIFY_OTP: `${API_BASE}/api/auth/verify-otp`,
    LOGIN: `${API_BASE}/api/auth/login`,
  },
};
