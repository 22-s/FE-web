import axios from "../../api/axios";

const MannerAPI = {
  getAll: async () => {
    const token = localStorage.getItem("accessToken"); // 로컬스토리지에서 토큰 가져오기

    if (!token) {
      throw new Error("No access token found.");
    }

    const res = await axios.get("/admin/manners", {
      headers: {
        Authorization: `Bearer ${token}`, // JWT 토큰을 Authorization 헤더에 추가
      },
    });

    return res.data;
  },

  create: async (data: {
    category: string;
    title: string;
    imageUrl: string;
    content: string;
  }) => {
    const token = localStorage.getItem("accessToken"); // 로컬스토리지에서 토큰 가져오기

    if (!token) {
      throw new Error("No access token found.");
    }

    await axios.post("/admin/manners", data, {
      headers: {
        Authorization: `Bearer ${token}`, // JWT 토큰을 Authorization 헤더에 추가
      },
    });
  },

  delete: async (mannerId: number) => {
    const token = localStorage.getItem("accessToken"); // 로컬스토리지에서 토큰 가져오기

    if (!token) {
      throw new Error("No access token found.");
    }

    await axios.delete(`/admin/manners/${mannerId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // JWT 토큰을 Authorization 헤더에 추가
      },
    });
  },
};

export default MannerAPI;
