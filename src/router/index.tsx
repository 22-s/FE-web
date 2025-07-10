import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  const isAuthenticated = !!localStorage.getItem("accessToken");

  return (
    <Routes>
      {/* 기본 루트로 들어오면 로그인 */}
      <Route path="/" element={<Login />} />

      {/* 관리자 페이지 - 로그인한 사람만 */}
      <Route
        path="/admin"
        element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
