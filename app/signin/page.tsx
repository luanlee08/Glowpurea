"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { login } from "@/services/auth.service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { tr } from "date-fns/locale"
import { set } from "date-fns"

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sign in with:", { identifier, password })
  } 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      toast.error("Vui lòng nhập email / số điện thoại và mật khẩu");
      return;
    }

    try {
      setLoading(true);

      const data = await login({ identifier, password });
      localStorage.setItem("token", data.token);
      toast.success("Đăng nhập thành công!");
      router.push("/");
    } catch (err: any) {
      toast.error(err.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    } 
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
      <Header />

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-primary/10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">
                🔐
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Đăng Nhập</h1>
              <p className="text-foreground/60">Chào mừng bạn quay lại Natural Lip Balm</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Email</label>
                <div className="relative">
                 <Input
                    type="text"
                    placeholder="Email hoặc số điện thoại"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Mật khẩu</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-border accent-primary" />
                  <span className="text-sm text-foreground/70">Nhớ tôi</span>
                </label>
                <Link href="#" className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                  Quên mật khẩu?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Đăng Nhập
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

            {/* Social Login */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full bg-transparent border border-border hover:bg-primary/5 transition-colors"
              >
                Đăng nhập với Google
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent border border-border hover:bg-primary/5 transition-colors"
              >
                Đăng nhập với Facebook
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-foreground/70">
                Chưa có tài khoản?{" "}
                <Link href="/signup" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                  Đăng ký ngay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
