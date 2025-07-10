import axios from "../../api/axios";

const VocaAPI = {
  getAll: async () => {
    const token = localStorage.getItem("accessToken");  // 로컬스토리지에서 토큰 가져오기

    if (!token) {
      throw new Error("No access token found.");
    }

    const res = await axios.get("/admin/vocas", {
      headers: {
        Authorization: `Bearer ${token}`,  // JWT 토큰을 Authorization 헤더에 추가
      },
    });

    return res.data;
  },

  create: async (data: {
    category: string;
    term: string;
    description: string;
    example: string;
  }) => {
    const token = localStorage.getItem("accessToken");  // 로컬스토리지에서 토큰 가져오기

    if (!token) {
      throw new Error("No access token found.");
    }

    await axios.post("/admin/vocas", data, {
      headers: {
        Authorization: `Bearer ${token}`,  // JWT 토큰을 Authorization 헤더에 추가
      },
    });
  },

  delete: async (vocaId: number) => {
    const token = localStorage.getItem("accessToken");  // 로컬스토리지에서 토큰 가져오기

    if (!token) {
      throw new Error("No access token found.");
    }

    await axios.delete(`/admin/vocas/${vocaId}`, {
      headers: {
        Authorization: `Bearer ${token}`,  // JWT 토큰을 Authorization 헤더에 추가
      },
    });
  },
};

export default VocaAPI;
