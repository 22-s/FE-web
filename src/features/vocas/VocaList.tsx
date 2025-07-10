import { useEffect, useState } from "react";
import VocaAPI from "./VocaAPI";

interface Voca {
  vocaId: number;
  category: string;
  term: string;
  description: string;
  example: string;
}

export default function VocaManager() {
  const [vocas, setVocas] = useState<Voca[]>([]);
  const [formData, setFormData] = useState({
    category: "",
    term: "",
    description: "",
    example: "",
  });

  useEffect(() => {
    fetchVocas();
  }, []);

  const fetchVocas = async () => {
    try {
      const data = await VocaAPI.getAll();
      setVocas(data);
    } catch (err) {
      console.error("단어 조회 실패:", err);
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
      await VocaAPI.create(formData);
      alert("단어가 성공적으로 등록되었습니다!");
      setFormData({
        category: "",
        term: "",
        description: "",
        example: "",
      });
      fetchVocas();
    } catch (err) {
      console.error("단어 등록 실패:", err);
      alert("단어 등록에 실패했습니다.");
    }
  };

  const handleDelete = async (vocaId: number) => {
    const confirmDelete = window.confirm("정말로 이 단어를 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await VocaAPI.delete(vocaId);
      setVocas((prev) => prev.filter((v) => v.vocaId !== vocaId));
    } catch (err) {
      console.error("단어 삭제 실패:", err);
      alert("삭제 실패");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">단어 관리</h2>

      {/* 등록 폼 */}
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg mb-8">
        <h3 className="text-lg font-bold mb-4">단어 등록</h3>

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
          <label className="block text-sm font-medium mb-1">용어</label>
          <input
            name="term"
            value={formData.term}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">설명</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">예시 문장</label>
          <textarea
            name="example"
            value={formData.example}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          등록
        </button>
      </form>

      {/* 단어 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vocas.map((voca) => (
          <div
            key={voca.vocaId}
            className="bg-white shadow-md rounded-lg p-5 border border-gray-200 flex flex-col justify-between"
          >
            <div>
              <div className="mb-2 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{voca.term}</h3>
                <button
                  onClick={() => handleDelete(voca.vocaId)}
                  className="text-sm text-red-600 hover:underline"
                >
                  삭제
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-2">{voca.description}</p>
              <p className="text-sm text-gray-500 italic mb-2">예시: {voca.example}</p>
              <p className="text-xs text-gray-400">카테고리: {voca.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
