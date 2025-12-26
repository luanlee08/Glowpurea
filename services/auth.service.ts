import { API_URL } from "@/configs/api-configs";

export interface RegisterPayload {
  accountName: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export interface LoginPayload  {
  identifier: string;
  password: string;
}
export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

export function isLoggedIn() {
  return !!getToken();
}

export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user"); // nếu có
}


export async function register(payload: RegisterPayload) {
  const res = await fetch(API_URL.AUTH.REGISTER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

const text = await res.text();

try {
  return JSON.parse(text);
} catch {
  return { message: text };
}
    
}
export async function verifyOtp(payload: {
  email: string;
  otpCode: string;
}) {
  const res = await fetch(API_URL.AUTH.VERIFY_OTP, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(text || "Xác thực OTP thất bại");
  }

  return text;
}
export async function login(payload: LoginPayload) {
  const res = await fetch(API_URL.AUTH.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(text || "Đăng nhập thất bại");
  }
  return JSON.parse(text);  
}
