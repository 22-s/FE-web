import axios from "../../api/axios";

export const fetchUsers = async () => {
  const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰을 가져옵니다.

  if (!token) {
    throw new Error("No access token found."); // 토큰이 없으면 에러를 던집니다.
  }

  // GET 요청을 보낼 때 Authorization 헤더에 Bearer token을 추가하여 보내줍니다.
  const response = await axios.get("/admin/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data; // 응답 데이터를 반환합니다.
};
