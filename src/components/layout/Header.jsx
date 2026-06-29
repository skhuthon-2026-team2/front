import { Link } from "react-router-dom";

export default function Header() {
  // 로그인 사용자 — 인증 연동 전이라 임시값. 추후 user store/API 응답으로 교체.
  const user = { name: "김모담" };

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200/70 bg-[#faf9f8]"><div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <Link
          to="/main"
          className="inline-block bg-[linear-gradient(120deg,#f79977_0%,#c8ce72_100%)] bg-clip-text font-brush text-2xl text-transparent"
        >
          모담
        </Link>

        <div className="flex items-center gap-3">
          <p className="text-sm font-bold text-gray-900">{user.name}님</p>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-modam-coral/15 text-sm font-bold text-modam-coral">
            {user.name.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
}
