import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../apis/axios";

export default function KakaoCallback() {
  console.log("=== KakaoCallback 렌더링 ===");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const called = useRef(false);

  console.log("현재 URL:", window.location.href);
  console.log("search:", window.location.search);
  console.log("code:", searchParams.get("code"));

  useEffect(() => {
    console.log("=== useEffect 실행 ===");

    const code = searchParams.get("code");

    if (!code) {
      console.log("❌ code가 없습니다.");
      return;
    }

    if (called.current) {
      console.log("❌ 이미 요청을 보냈습니다.");
      return;
    }

    called.current = true;

    console.log("✅ 백엔드 요청 시작");

    api
      .get("/api/auth/login/kakao", {
        params: { code },
      })
      .then((res) => {
        console.log("✅ 로그인 성공", res);

        const { accessToken, refreshToken } = res.data.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        navigate("/main", { replace: true });
      })
      .catch((err) => {
        console.error("❌ 로그인 실패");
        console.error(err);

        if (err.response) {
          console.error("status:", err.response.status);
          console.error("data:", err.response.data);
        }

        navigate("/login", { replace: true });
      });
  }, [searchParams, navigate]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-white">
      <p className="text-sm text-gray-500">로그인 중입니다...</p>
    </div>
  );
}
