import { useEffect, useState } from "react";
import FeedAPI from "./feedAPI";

interface Feedback {
  feedbackId: number;
  category: string;
  content: string;
  email?: string;
  nickname?: string;
  isAnonymous: boolean;
}

const getCategoryKorean = (category: string): string => {
  switch (category) {
    case "APP_FEATURE":
      return "앱 기능";
    case "QUIZ_CONTENT":
      return "퀴즈 콘텐츠";
    case "UI_UX":
      return "UI/UX";
    case "ETC":
      return "기타";
    default:
      return category;
  }
};

export default function FeedList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await FeedAPI.getAll();
        setFeedbacks(data);
      } catch (error) {
        console.error("피드백 조회 실패:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">사용자 피드백 목록</h2>
      <div className="grid grid-cols-2 gap-4">
        {feedbacks.map((feedback) => (
          <div
            key={feedback.feedbackId}
            className="bg-white p-4 shadow rounded-md border border-gray-200"
          >
            <p className="text-sm font-semibold text-blue-600">
              {getCategoryKorean(feedback.category)}
            </p>
            <p className="mt-2 text-gray-700">{feedback.content}</p>
            <p className="mt-2 text-sm text-gray-400">
              {feedback.isAnonymous ? "익명 사용자" : `${feedback.nickname} (${feedback.email})`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
