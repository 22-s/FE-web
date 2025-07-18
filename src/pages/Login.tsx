import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 로그인 요청
    axios
      .post("/admin/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        // 로그인 성공 시 토큰을 로컬스토리지에 저장
        const { accessToken, refreshToken } = res.data.result;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        navigate("/admin");  // 로그인 성공 후 대시보드로 이동
      })
      .catch((err) => {
        console.error(err);
        alert("로그인 실패");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br min-h-screen bg-sky-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">관리자 로그인</h2>
        <input
          type="email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-600 transition text-white font-semibold py-3 px-6 rounded-lg w-full shadow-md"
        >
          로그인
        </button>
        <p className="text-sm text-gray-500 mt-4">
          승인된 관리자만 접근 가능합니다.
        </p>
      </div>
    </div>
  );
}
