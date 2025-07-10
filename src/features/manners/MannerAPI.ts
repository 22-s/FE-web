import axios from "../../api/axios";

const MannerAPI = {
  getAll: async () => {
    const res = await axios.get("/admin/manners");
    return res.data;
  },

  create: async (data: {
    category: string;
    title: string;
    imageUrl: string;
    content: string;
  }) => {
    await axios.post("/admin/manners", data);
  },

  delete: async (mannerId: number) => {
    await axios.delete(`/admin/manners/${mannerId}`);
  },
};

export default MannerAPI;
