import axios from "../../api/axios";

interface Voca {
  vocaId: number;
  category: string;
  term: string;
  description: string;
  example: string;
}

interface ApiResponse<T> {
  isSuccess: boolean;
  code: number;
  message: string;
  result: T;
}

const VocaAPI = {
  getAll: async (): Promise<Voca[]> => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No access token found.");
    }

    const res = await axios.get<ApiResponse<Voca[]>>("/admin/vocas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.result; // ✅ 이 부분이 핵심!
  },

  create: async (data: {
    category: string;
    term: string;
    description: string;
    example: string;
  }): Promise<void> => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No access token found.");
    }

    const res = await axios.post<ApiResponse<null>>("/admin/vocas", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.data.isSuccess) {
      throw new Error(res.data.message);
    }
  },

  delete: async (vocaId: number): Promise<void> => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No access token found.");
    }

    const res = await axios.delete<ApiResponse<null>>(`/admin/vocas/${vocaId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.data.isSuccess) {
      throw new Error(res.data.message);
    }
  },
};

export default VocaAPI;
