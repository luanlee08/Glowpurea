import axios from "axios"
import { API_ENDPOINTS } from "@/configs/api-configs"

const getToken = () => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

// ===== GET PROFILE =====
export const getProfile = async () => {
  const token = getToken()
  if (!token) throw new Error("Chưa đăng nhập")

  const res = await axios.get(API_ENDPOINTS.PROFILE.ME, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}

// ===== UPDATE PROFILE =====
export const updateProfile = async (data: {
  accountName: string
  phoneNumber?: string
}) => {
  const token = getToken()
  if (!token) throw new Error("Chưa đăng nhập")

  const res = await axios.put(API_ENDPOINTS.PROFILE.ME, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}

// ===== UPLOAD AVATAR =====
export const uploadAvatar = async (file: File) => {
  const token = getToken()
  if (!token) throw new Error("Chưa đăng nhập")

  const formData = new FormData()
  formData.append("file", file) // ⚠️ BE yêu cầu key = file

  const res = await axios.post(
    API_ENDPOINTS.PROFILE.UPLOAD_AVATAR,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  )

  return res.data // { imageUrl: "/uploads/avatars/xxx.jpg" }
}
