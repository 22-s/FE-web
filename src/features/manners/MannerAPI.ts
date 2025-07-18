import axios from "../../api/axios";

interface Manner {
  mannerId: number;
  category: string;
  title: string;
  imageUrl: string;
  content: string;
}

interface ApiResponse<T> {
  isSuccess: boolean;
  code: number;
  message: string;
  result: T;
}

const MannerAPI = {
  getAll: async (): Promise<Manner[]> => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No access token found.");
    }

    const res = await axios.get<ApiResponse<Manner[]>>("/admin/manners", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.result; // ✅ 핵심 수정!
  },

  create: async (data: {
    category: string;
    title: string;
    imageUrl: string;
    content: string;
  }): Promise<void> => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No access token found.");
    }

    const res = await axios.post<ApiResponse<null>>("/admin/manners", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.data.isSuccess) {
      throw new Error(res.data.message);
    }
  },

  delete: async (mannerId: number): Promise<void> => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No access token found.");
    }

    const res = await axios.delete<ApiResponse<null>>(`/admin/manners/${mannerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.data.isSuccess) {
      throw new Error(res.data.message);
    }
  },
};

export default MannerAPI;
