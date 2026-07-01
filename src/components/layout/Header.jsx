import { Link, NavLink } from "react-router-dom";
import logo from "../common/img/모담.png";

export default function Header({ showSearch = false, tabs = null, clubId }) {
  const user = { name: "김서연" };

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200/70 bg-[#faf9f8]">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-6">
        <Link to="/main" className="flex shrink-0 items-center gap-2">
          <img src={logo} alt="모담" className="h-6 w-auto" />
          <span className="hidden text-xs text-gray-400 lg:inline">
            모아 담다, 우리의 기록
          </span>
        </Link>

        {tabs && (
          <nav className="flex h-full items-center gap-1">
            {tabs.map((tab) => (
              <NavLink
                key={tab.key}
                to={`/club/${clubId}/${tab.path}`}
                className={({ isActive }) =>
                  `relative flex h-full items-center px-3 text-sm font-medium transition-colors ${isActive
                    ? "text-modam-coral"
                    : "text-gray-500 hover:text-gray-800"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {tab.label}
                    {isActive && (
                      <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-modam-coral" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        )}

        <div className="ml-auto flex shrink-0 items-center gap-4">
          {showSearch && (
            <div className="relative hidden w-64 md:block">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </span>

              <input
                placeholder="동아리 또는 게시글 검색"
                className="w-full rounded-full bg-white py-2 pl-10 pr-4 text-sm outline-none ring-1 ring-gray-200 transition focus:ring-modam-coral/40"
              />
            </div>
          )}

          <Link
            to="/mypage/profile"
            className="flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-white"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-modam-coral/15 text-sm font-bold text-modam-coral">
              {user.name.charAt(0)}
            </div>
            <p className="text-sm font-bold text-gray-900">{user.name}님</p>
          </Link>
        </div>
      </div>
    </header>
  );
}