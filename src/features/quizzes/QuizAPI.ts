import axios from "../../api/axios";

const QuizAPI = {
  getAll: async () => {
    const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰 가져오기

    if (!token) {
      throw new Error("No access token found.");
    }

    const res = await axios.get("/admin/quizzes", {
      headers: {
        Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
      },
    });
    return res.data;
  },

  create: async (data: {
    category: string;
    question: string;
    answer: string;
    description: string;
    questionDetail: string;
  }) => {
    const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰 가져오기

    if (!token) {
      throw new Error("No access token found.");
    }

    await axios.post("/admin/quizzes", data, {
      headers: {
        Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
      },
    });
  },

  delete: async (quizId: number) => {
    const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰 가져오기

    if (!token) {
      throw new Error("No access token found.");
    }

    await axios.delete(`/admin/quizzes/${quizId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
      },
    });
  },
};

export default QuizAPI;
