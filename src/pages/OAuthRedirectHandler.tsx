import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function OAuthRedirectHandler() {
  const navigate = useNavigate();
  const hasProcessed = useRef(false); // ✅ 중복 실행 방지용 플래그

  useEffect(() => {
    // 이미 처리된 경우 무시
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const code = new URL(window.location.href).searchParams.get("code");

    if (code) {
      // Step 1: 카카오에 access token 요청
      axios
        .post(
          "https://kauth.kakao.com/oauth/token",
          null,
          {
            params: {
              grant_type: "authorization_code",
              client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
              redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
              code: code,
            },
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        )
        .then((res) => {
          const kakaoAccessToken = res.data.access_token;
          console.log("카카오 access token:", kakaoAccessToken);

          // Step 2: 백엔드에 access token 전달
          return axios.post("/api/auth/kakao/login", {
            accessToken: kakaoAccessToken,
          });
        })
        .then((res) => {
          localStorage.setItem("accessToken", res.data.result.accessToken);
          navigate("/admin");
        })
        .catch((err) => {
          console.error(err);
          alert("로그인 실패");
          navigate("/");
        });
    }
  }, [navigate]);

  return <div>로그인 중입니다...</div>;
}
