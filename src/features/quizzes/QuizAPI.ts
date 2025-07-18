import axios from "../../api/axios";

interface Quiz {
  quizId: number;
  category: string;
  question: string;
  answer: string;
  description: string;
  questionDetail: string;
  quizLevel: string;
}

interface ApiResponse<T> {
  isSuccess: boolean;
  code: number;
  message: string;
  result: T;
}

const QuizAPI = {
  // 퀴즈 전체 조회
  getAll: async (): Promise<Quiz[]> => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No access token found.");
    }

    const res = await axios.get<ApiResponse<Quiz[]>>("/admin/quizzes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.result; // ✅ 여기만 수정됨!
  },

  // 퀴즈 등록
  create: async (data: {
    category: string;
    question: string;
    answer: string;
    description: string;
    questionDetail: string;
    quizLevel: string;
  }): Promise<void> => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No access token found.");
    }

    const res = await axios.post<ApiResponse<null>>("/admin/quizzes", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.data.isSuccess) {
      throw new Error("퀴즈 등록 실패: " + res.data.message);
    }
  },

  // 퀴즈 삭제
  delete: async (quizId: number): Promise<void> => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No access token found.");
    }

    const res = await axios.delete<ApiResponse<null>>(`/admin/quizzes/${quizId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.data.isSuccess) {
      throw new Error("퀴즈 삭제 실패: " + res.data.message);
    }
  },
};

export default QuizAPI;
