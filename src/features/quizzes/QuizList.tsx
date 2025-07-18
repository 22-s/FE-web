import { useEffect, useState } from "react";
import QuizAPI from "./QuizAPI";
import { useNavigate } from "react-router-dom";

interface Quiz {
  quizId: number;
  category: string;
  question: string;
  answer: string;
  description: string;
  questionDetail: string;
  quizLevel: string;
}

export default function QuizManager() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [formData, setFormData] = useState({
    category: "",
    question: "",
    answer: "O",
    description: "",
    questionDetail: "",
    quizLevel: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      // 토큰이 없으면 로그인 페이지로 리디렉션
      navigate("/");
      return;
    }

    fetchQuizzes();
  }, [navigate]);

  const fetchQuizzes = async () => {
    try {
      const data = await QuizAPI.getAll();
      setQuizzes(data);
    } catch (err) {
      console.error("퀴즈 조회 실패:", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await QuizAPI.create(formData);
      alert("퀴즈가 성공적으로 등록되었습니다!");
      setFormData({
        category: "",
        question: "",
        answer: "O",
        description: "",
        questionDetail: "",
        quizLevel: "",
      });
      fetchQuizzes();
    } catch (err) {
      console.error("퀴즈 등록 실패:", err);
      alert("퀴즈 등록에 실패했습니다.");
    }
  };

  const handleDelete = async (quizId: number) => {
    const confirmDelete = window.confirm("정말로 이 퀴즈를 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await QuizAPI.delete(quizId);
      setQuizzes((prev) => prev.filter((quiz) => quiz.quizId !== quizId));
    } catch (err) {
      console.error("퀴즈 삭제 실패:", err);
      alert("삭제 실패");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">퀴즈 관리</h2>

      {/* 등록 폼 */}
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg mb-8">
        <h3 className="text-lg font-bold mb-4">퀴즈 등록</h3>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">카테고리</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">카테고리를 선택하세요</option>
            <option value="기본 매너">기본 매너</option>
            <option value="명함 공유 매너">명함 공유 매너</option>
            <option value="직장인 글쓰기 Tip">직장인 글쓰기 Tip</option>
            <option value="팀장님께 메일 보내기">팀장님께 메일 보내기</option>
            <option value="커뮤니케이션 매너">커뮤니케이션 매너</option>
            <option value="TPO에 맞는 복장">TPO에 맞는 복장</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">문제</label>
          <input
            name="question"
            value={formData.question}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">힌트/문제 설명</label>
          <textarea
            name="questionDetail"
            value={formData.questionDetail}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">정답</label>
          <select
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="O">O</option>
            <option value="X">X</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">해설</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">난이도</label>
          <select
            name="quizLevel"
            value={formData.quizLevel}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="EASY">EASY</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          등록
        </button>
      </form>

      {/* 퀴즈 목록 */}
      <div className="space-y-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.quizId}
            className="bg-white shadow-md rounded-lg p-5 border border-gray-200"
          >
            <div className="mb-2 flex justify-between items-center">
              <div>
                <span className="text-xs text-gray-500 font-semibold mr-2">ID:</span>
                <span className="text-sm text-gray-800">{quiz.quizId}</span>
              </div>
              <button
                onClick={() => handleDelete(quiz.quizId)}
                className="text-sm text-red-600 hover:underline"
              >
                삭제
              </button>
            </div>

            <div className="mb-2">
              <span className="text-xs text-gray-500 font-semibold mr-2">카테고리:</span>
              <span className="text-sm text-blue-600">{quiz.category}</span>
            </div>

            <div className="mb-2">
              <span className="text-xs text-gray-500 font-semibold mr-2">난이도:</span>
              <span className="text-sm text-blue-600">{quiz.quizLevel}</span>
            </div>

            <div className="mb-2">
              <span className="text-xs text-gray-500 font-semibold mr-2">문제:</span>
              <p className="text-base font-medium text-gray-900">{quiz.question}</p>
            </div>

            <div className="mb-2">
              <span className="text-xs text-gray-500 font-semibold mr-2">힌트:</span>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {quiz.questionDetail}
              </p>
            </div>

            <div className="mb-2">
              <span className="text-xs text-gray-500 font-semibold mr-2">정답:</span>
              <span className="text-green-600 font-semibold">{quiz.answer}</span>
            </div>

            <div>
              <span className="text-xs text-gray-500 font-semibold mr-2">해설:</span>
              <p className="text-sm text-gray-700">{quiz.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
