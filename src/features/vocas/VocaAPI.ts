import axios from "../../api/axios";

const VocaAPI = {
  getAll: async () => {
    const res = await axios.get("/admin/vocas");
    return res.data;
  },
  create: async (data: {
    category: string;
    term: string;
    description: string;
    example: string;
  }) => {
    await axios.post("/admin/vocas", data);
  },
  delete: async (vocaId: number) => {
    await axios.delete(`/admin/vocas/${vocaId}`);
  },
};

export default VocaAPI;
