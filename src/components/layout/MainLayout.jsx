import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { getMyProfile } from "../../apis/mypageApi";
import { useUserStore } from "../../stores/userStore";

export default function MainLayout() {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    let cancelled = false;

    const hydrateUserProfile = async () => {
      try {
        const profile = await getMyProfile();
        if (cancelled || !profile) return;

        setUser({
          name: profile.nickname ?? profile.name ?? "",
          profileImage: profile.imageUrl ?? profile.profileImage ?? "",
        });

        if (profile.userId !== undefined && profile.userId !== null) {
          localStorage.setItem("userId", String(profile.userId));
        }
      } catch {
        // Ignore bootstrap errors here; page-level UI can handle detailed failures.
      }
    };

    hydrateUserProfile();

    return () => {
      cancelled = true;
    };
  }, [setUser]);

  return (
    <div className="min-h-dvh bg-[#faf9f8]">
      <Header />
      <Outlet />
    </div>
  );
}
