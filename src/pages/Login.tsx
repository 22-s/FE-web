export default function Login() {
  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">관리자 로그인</h2>
        <button
          onClick={handleKakaoLogin}
          className="bg-[#FEE500] hover:bg-yellow-300 transition text-black font-semibold py-3 px-6 rounded-lg w-full shadow-md"
        >
          카카오로 로그인
        </button>
        <p className="text-sm text-gray-500 mt-4">
          승인된 관리자만 접근 가능합니다.
        </p>
      </div>
    </div>
  );
}
