import { useEffect, useState } from "react";
import MannerAPI from "./MannerAPI";

interface Manner {
  mannerId: number;
  category: string;
  title: string;
  imageUrl: string;
  content: string;
}

export default function MannerList() {
  const [manners, setManners] = useState<Manner[]>([]);
  const [newManner, setNewManner] = useState({
    category: "",
    title: "",
    imageUrl: "",
    content: "",
  });

  useEffect(() => {
    fetchManners();
  }, []);

  const fetchManners = async () => {
    try {
      const data = await MannerAPI.getAll();
      setManners(data);
    } catch (err) {
      console.error("매너 조회 실패:", err);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("정말로 이 매너를 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await MannerAPI.delete(id);
      setManners((prev) => prev.filter((m) => m.mannerId !== id));
    } catch (err) {
      console.error("매너 삭제 실패:", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewManner((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await MannerAPI.create(newManner);
      setNewManner({ category: "", title: "", imageUrl: "", content: "" });
      fetchManners(); // 새로고침
    } catch (err) {
      console.error("매너 등록 실패:", err);
    }
  };

  const categories = [
    "기본 매너",
    "명함 공유 매너",
    "직장인 글쓰기 Tip",
    "팀장님께 메일 보내기",
    "커뮤니케이션 매너",
    "TPO에 맞는 복장"
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">매너 등록</h2>
          <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                placeholder="제목"
                value={newManner.title}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              <select
                name="category"
                value={newManner.category}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              >
                <option value="">카테고리 선택</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="imageUrl"
                placeholder="이미지 URL"
                value={newManner.imageUrl}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <textarea
                name="content"
                placeholder="내용"
                value={newManner.content}
                onChange={handleChange}
                className="border p-2 rounded col-span-1 md:col-span-2"
                rows={3}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              등록하기
            </button>
          </form>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">매너 목록</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {manners.map((manner) => (
            <div
              key={manner.mannerId}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
            >
              {manner.imageUrl && (
                <img
                  src={manner.imageUrl}
                  alt={manner.title}
                  className="h-40 w-full object-cover"
                />
              )}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{manner.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">{manner.content}</p>
                  <span className="text-xs text-gray-400">카테고리: {manner.category}</span>
                </div>
                <button
                  onClick={() => handleDelete(manner.mannerId)}
                  className="mt-4 text-sm text-red-600 hover:underline self-end"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
