import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../apis/axios";
import { useAuthStore } from "../../stores/authStore";

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
      .then((response) => {
        const auth = response.data?.data ?? {};
        const savedUserId = auth.userId ?? auth.id;

        if (auth.accessToken) {
          localStorage.setItem("accessToken", auth.accessToken);
        }
        if (auth.refreshToken) {
          localStorage.setItem("refreshToken", auth.refreshToken);
        }
        if (savedUserId !== undefined && savedUserId !== null) {
          localStorage.setItem("userId", String(savedUserId));
        }

        if (!auth.accessToken) {
          throw new Error("missing accessToken");
        }

        useAuthStore.setState({ isLoggedIn: true });
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
