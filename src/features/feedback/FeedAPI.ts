import axios from "../../api/axios";

const FeedAPI = {
  getAll: async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("No access token found.");
    }

    const res = await axios.get("/admin/app", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.result;
  },
};

export default FeedAPI;
