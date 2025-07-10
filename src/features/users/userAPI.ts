import axios from "../../api/axios";

export const fetchUsers = async () => {
  const response = await axios.get("/admin/users", {
    withCredentials: true,
  });
  return response.data;
};
