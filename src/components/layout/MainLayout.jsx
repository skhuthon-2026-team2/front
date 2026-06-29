import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function MainLayout() {
  return (
    <div className="min-h-dvh bg-[#faf9f8]">
      <Header />
      <Outlet />
    </div>
  );
}
