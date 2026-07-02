import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { getMyProfile } from "../../apis/mypageApi";
import { useUserStore } from "../../stores/userStore";

export default function MainLayout() {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getMyProfile();

        setUser({
          name: data.nickname,
          profileImage: data.imageUrl,
        });
      } catch (err) {
        console.error("사용자 정보 조회 실패:", err);
      }
    };

    loadUser();
  }, [setUser]);

  return (
    <div className="min-h-dvh bg-[#faf9f8]">
      <Header />
      <Outlet />
    </div>
  );
}