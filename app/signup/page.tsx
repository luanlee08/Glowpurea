"use client"
import VerifyOtpModal from "@/components/auth/VerifyOtpModal";
import type React from "react"
import { register } from "@/services/auth.service"
import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock, User, Eye, EyeOff, CheckCircle } from "lucide-react"
import toast from "react-hot-toast"
import { Phone } from "lucide-react";

export default function SignUp() {
  const [showVerifyOtp, setShowVerifyOtp] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
 const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
});

  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

const handleSignUp = async (e: React.FormEvent) => {
  e.preventDefault()

if (!formData.fullName.trim()) {
  toast.error("❗ Vui lòng nhập họ và tên");
  return;
}

if (!formData.email.trim()) {
  toast.error("❗ Vui lòng nhập email");
  return;
}

if (!formData.phoneNumber.trim()) {
  toast.error("❗ Vui lòng nhập số điện thoại");
  return;
}

if (formData.password !== formData.confirmPassword) {
  toast.error("❌ Mật khẩu xác nhận không khớp");
  return;
}

  const loadingToast = toast.loading("⏳ Đang tạo tài khoản...")

  try {
    await register({
      accountName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
    });


      toast.success(
      "🎉 Đăng ký thành công! Vui lòng kiểm tra email để nhập OTP",
      { id: loadingToast }
    );

    // ✅ LƯU EMAIL + MỞ POPUP OTP
    setRegisteredEmail(formData.email);

    setTimeout(() => {
      setShowVerifyOtp(true);
    }, 1500);

  } catch (err: any) {
    toast.error(
      err?.message || "❌ Đăng ký thất bại, vui lòng thử lại",
      { id: loadingToast }
    )
  }
}



  const passwordStrength = formData.password.length >= 8 ? "strong" : formData.password.length >= 6 ? "medium" : "weak"
  const passwordStrengthColor =
    passwordStrength === "weak" ? "bg-destructive" : passwordStrength === "medium" ? "bg-accent" : "bg-primary"
  const passwordStrengthText =
    passwordStrength === "weak" ? "Yếu" : passwordStrength === "medium" ? "Trung bình" : "Mạnh"

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
      <Header />

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-primary/10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">
                🎉
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Đăng Ký</h1>
              <p className="text-foreground/60">Tạo tài khoản để bắt đầu mua sắm</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSignUp} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Họ và Tên</label>
                <div className="relative">
                  <Input
                    type="text"
                    name="fullName"
                    placeholder="Nguyễn Văn A"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary" />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Email</label>
                <div className="relative">
                  <Input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary" />
                </div>
              </div>
{/* Phone Number */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Số điện thoại
                </label>
                <div className="relative">
                  <Input
                    type="tel"
                    name="phoneNumber"
                    placeholder="0123456789"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="pl-10 pr-4 py-3"
                  />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Mật khẩu</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="space-y-1">
                  <div className="flex gap-1">
                    <div
                      className={`h-2 flex-1 rounded-full ${formData.password.length >= 1 ? passwordStrengthColor : "bg-muted"}`}
                    ></div>
                    <div
                      className={`h-2 flex-1 rounded-full ${formData.password.length >= 4 ? passwordStrengthColor : "bg-muted"}`}
                    ></div>
                    <div
                      className={`h-2 flex-1 rounded-full ${formData.password.length >= 8 ? passwordStrengthColor : "bg-muted"}`}
                    ></div>
                  </div>
                  {formData.password && (
                    <span
                      className={`text-xs font-medium ${passwordStrengthColor === "bg-primary" ? "text-primary" : passwordStrengthColor === "bg-accent" ? "text-accent" : "text-destructive"}`}
                    >
                      Độ mạnh: {passwordStrengthText}
                    </span>
                  )}
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Xác nhận mật khẩu</label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 pr-10 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.password && formData.confirmPassword && (
                  <div
                    className={`flex items-center gap-2 text-sm ${formData.password === formData.confirmPassword ? "text-primary" : "text-destructive"}`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    {formData.password === formData.confirmPassword
                      ? "Mật khẩu trùng khớp"
                      : "Mật khẩu không trùng khớp"}
                  </div>
                )}
              </div>

              {/* Terms & Conditions */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 rounded border-border mt-1 accent-primary"
                />
                <span className="text-sm text-foreground/70">
                  Tôi đồng ý với{" "}
                  <Link href="#" className="text-primary hover:text-primary/80 font-medium transition-colors">
                    Điều khoản sử dụng
                  </Link>{" "}
                  và{" "}
                  <Link href="#" className="text-primary hover:text-primary/80 font-medium transition-colors">
                    Chính sách bảo mật
                  </Link>
                </span>
              </label>

              <Button
                type="submit"
                disabled={!agreeTerms}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Đăng Ký
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-foreground/60">Hoặc</span>
              </div>
            </div>

            {/* Social Sign Up */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full bg-transparent border border-border hover:bg-primary/5 transition-colors"
              >
                Đăng ký với Google
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent border border-border hover:bg-primary/5 transition-colors"
              >
                Đăng ký với Facebook
              </Button>
            </div>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-foreground/70">
                Đã có tài khoản?{" "}
                <Link href="/signin" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                  Đăng nhập
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <VerifyOtpModal
  open={showVerifyOtp}
  email={registeredEmail}
  onClose={() => setShowVerifyOtp(false)}
/>

    </main>
  )
}
