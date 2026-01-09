import axios from "axios";
import { API_ENDPOINTS } from "@/configs/api-configs";

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
};

export const getProfile = async () => {
  const token = getToken();

  if (!token) {
    throw new Error("Chưa đăng nhập (missing token)");
  }

  const res = await axios.get(API_ENDPOINTS.AUTH.ME, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await axios.post(
    API_ENDPOINTS.AUTH.UPLOAD_AVATAR,
    formData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};
