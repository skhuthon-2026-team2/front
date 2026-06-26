import { NavLink, Outlet, useParams } from "react-router-dom";

export default function ClubLayout() {
  const { clubId } = useParams();
  const base = `/club/${clubId}`;

  const tabs = [
    { to: `${base}/feed`, label: "피드" },
    { to: `${base}/timeline`, label: "타임라인" },
    { to: `${base}/ai`, label: "추천 AI" },
  ];

  return (
    <div className="w-full">
      <nav className="flex gap-4 border-b border-gray-200 px-4">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `py-3 px-2 border-b-2 transition-colors ${
                isActive
                  ? "text-black font-bold border-black"
                  : "text-gray-500 font-normal border-transparent"
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
