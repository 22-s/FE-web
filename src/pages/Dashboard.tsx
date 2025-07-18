import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserList from "../features/users/UserList";
import MannerList from "../features/manners/MannerList";
import QuizList from "../features/quizzes/QuizList";
import VocaList from "../features/vocas/VocaList";
import FeedList from "../features/feedback/FeedList";

export default function Dashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("users");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const tabs = [
    { id: "users", label: "사용자" },
    { id: "manners", label: "매너" },
    { id: "quizzes", label: "퀴즈" },
    { id: "vocas", label: "단어" },
    { id: "feedback", label: "피드백" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800">관리자 대시보드</h1>
        </div>
      </header>

      {/* Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-2 flex justify-center space-x-4">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`px-4 py-2 rounded-md font-medium transition ${
                tab === id
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-6">
        {tab === "users" && <UserList />}
        {tab === "manners" && <MannerList />}
        {tab === "quizzes" && <QuizList />}
        {tab === "vocas" && <VocaList />}
        {tab === "feedback" && <FeedList />}
      </main>
    </div>
  );
}
