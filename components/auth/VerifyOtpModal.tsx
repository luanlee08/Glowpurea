"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { verifyOtp } from "@/services/auth.service";
import { useRouter } from "next/navigation";

interface Props {
  email: string;
  open: boolean;
  onClose: () => void;
}

export default function VerifyOtpModal({ email, open, onClose }: Props) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!open) return null;

  const handleVerify = async () => {
    if (!otp) {
      toast.error("Vui lòng nhập mã OTP");
      return;
    }

    try {
      setLoading(true);

      await verifyOtp({ email, otpCode: otp });

      toast.success("✅ Xác thực OTP thành công!");
      
      onClose();
       setTimeout(() => {
      onClose();
      router.push("/signin"); // 👉 chuyển trang đăng nhập
    }, 800);


    } catch (err: any) {
      toast.error(err.message || "OTP không hợp lệ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-[360px] shadow-xl">
        <h2 className="text-xl font-bold mb-2">Xác thực OTP</h2>
        <p className="text-sm text-gray-600 mb-4">
          Mã OTP đã được gửi tới <b>{email}</b>
        </p>

        <Input
          placeholder="Nhập mã OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="text-center text-lg tracking-widest"
        />

        <div className="mt-5 flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            Hủy
          </Button>

          <Button
            className="flex-1"
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? "Đang xác thực..." : "Xác nhận"}
          </Button>
        </div>
      </div>
    </div>
  );
}
