import axios from "axios";
import { API_BASE } from "@/configs/api-configs";

export interface BlogCategory {
  blogCategoryId: number;
  blogCategoryName: string;
}

export const getBlogCategories = async (): Promise<BlogCategory[]> => {
  const res = await axios.get(`${API_BASE}/api/blog-categories`);
  return res.data;
};
