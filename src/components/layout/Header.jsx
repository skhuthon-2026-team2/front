import { Link } from "react-router-dom";
import logo from "../common/img/모담.png";

export default function Header() {
  const user = { name: "김모담" };

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200/70 bg-[#faf9f8]">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <Link to="/main" className="inline-block">
          <img src={logo} alt="모담" className="h-6 w-auto" />
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
