import axios from "../../api/axios";

const QuizAPI = {
  getAll: async () => {
    const res = await axios.get("/admin/quizzes");
    return res.data;
  },
  create: async (data: {
    category: string;
    question: string;
    answer: string;
    description: string;
    questionDetail: string;
  }) => {
    await axios.post("/admin/quizzes", data);
  },
  delete: async (quizId: number) => {
    await axios.delete(`/admin/quizzes/${quizId}`);
  },
};

export default QuizAPI;
