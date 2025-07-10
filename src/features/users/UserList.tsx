import { useEffect, useState } from "react";
import { fetchUsers } from "./userAPI";
import { useNavigate } from "react-router-dom";

interface User {
  userId: number;
  email: string;
  nickname: string;
  profileImage: string;
  provider: string;
  createdAt: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      // 토큰이 없으면 로그인 페이지로 리디렉션
      navigate("/");
      return;
    }

    fetchUsers()
      .then(setUsers)
      .catch((err) => {
        console.error(err);
        alert("사용자 데이터를 가져오는 데 실패했습니다.");
      });
  }, [navigate]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">사용자 목록</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user.userId}
            className="bg-white shadow-md p-4 rounded-md flex items-center space-x-4"
          >
            <img
              src={user.profileImage || "https://via.placeholder.com/48"}
              alt={user.nickname}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-800">{user.nickname}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">Provider: {user.provider}</p>
              <p className="text-xs text-gray-400">가입일: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
