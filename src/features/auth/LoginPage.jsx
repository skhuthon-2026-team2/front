import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../../stores/authStore";

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?${new URLSearchParams(
  {
    client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
    // Default redirect should match the route that handles the callback in Router.jsx
    redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI ?? `${window.location.origin}/oauth/kakao`,
    response_type: "code",
  }
)}`;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

function Sparkle({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`absolute text-modam-coral/70 ${className}`}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 0l1.6 10.4L24 12l-10.4 1.6L12 24l-1.6-10.4L0 12l10.4-1.6L12 0z" />
    </svg>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (!code) return;

    let cancelled = false;

    const loginWithKakaoCode = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/login/kakao`, {
          params: { code },
        });
        const tokenData = response.data?.data ?? {};

        if (tokenData.accessToken) {
          localStorage.setItem("accessToken", tokenData.accessToken);
        }

        if (tokenData.refreshToken) {
          localStorage.setItem("refreshToken", tokenData.refreshToken);
        }

        useAuthStore.setState({ isLoggedIn: true });

        if (!cancelled) {
          navigate("/main", { replace: true });
        }
      } catch {
        if (!cancelled) {
          navigate("/login", { replace: true });
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loginWithKakaoCode();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const handleKakaoLogin = () => {
    window.location.assign(KAKAO_AUTH_URL);
  };

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-start overflow-hidden bg-white px-6 pt-[24vh]">
      <svg
        viewBox="0 0 400 220"
        className="pointer-events-none absolute top-[20vh] w-[130%] max-w-xl opacity-40"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="swirl" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f79977" stopOpacity="0" />
            <stop offset="50%" stopColor="#f79977" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#c8ce72" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M20 140 C 120 60, 180 60, 210 110 S 300 170, 380 80"
          stroke="url(#swirl)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative flex animate-rise flex-col items-center">
        <Sparkle className="-top-2 right-10 h-5 w-5" />
        <Sparkle className="top-2 left-8 h-3.5 w-3.5" />

        <h1 className="bg-[linear-gradient(120deg,#f79977_0%,#c8ce72_100%)] bg-clip-text font-brush text-8xl leading-none text-transparent">
          모담
        </h1>
        <p className="mt-3 font-brush text-xl text-modam-coral/70">추억을 모으다</p>
      </div>

      <button
        type="button"
        onClick={handleKakaoLogin}
        disabled={isLoading}
        className="mt-28 flex w-full max-w-xs animate-rise items-center justify-center gap-2 rounded-xl bg-[#FEE500] py-3.5 text-[15px] font-medium text-black/85 transition-transform active:scale-[0.98]"
        style={{ animationDelay: "300ms" }}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
          <path d="M12 3C6.477 3 2 6.463 2 10.74c0 2.766 1.872 5.19 4.683 6.56-.207.77-.748 2.79-.856 3.222-.134.537.197.53.414.386.17-.113 2.708-1.84 3.807-2.59.63.093 1.28.142 1.952.142 5.523 0 10-3.463 10-7.74S17.523 3 12 3z" />
        </svg>
        카카오 로그인
      </button>
    </main>
  );
}
