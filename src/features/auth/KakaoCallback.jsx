import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../apis/axios";

export default function KakaoCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const called = useRef(false);

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code || called.current) return;
    called.current = true;

    api
      .get("/api/auth/login/kakao", { params: { code } })
      .then((res) => {
        const { accessToken, refreshToken } = res.data.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        navigate("/main", { replace: true });
      })
      .catch(() => {
        navigate("/login", { replace: true });
      });
  }, [searchParams, navigate]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-white">
      <p className="text-sm text-gray-500">로그인 중입니다...</p>
    </div>
  );
}
