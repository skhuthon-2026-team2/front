import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../../components/common/Modal";
import { useUserStore } from "../../../stores/userStore";
import { useAuthStore } from "../../../stores/authStore";

export default function MySidebar() {
    const navigate = useNavigate();

    const { user } = useUserStore();
    const resetUser = useUserStore((state) => state.resetUser);
    const setLoggedOut = useAuthStore((state) => state.setLoggedOut);
    const profileImage = user?.profileImage || "";
    const displayName = user?.name || "";

    const [logoutModalOpen, setLogoutModalOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");

        resetUser();
        setLoggedOut();

        navigate("/login");
    };
    return (

        <aside className="w-[250px] shrink-0">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex flex-col items-center">
                    {profileImage ? (
                        <img
                            src={profileImage}
                            alt={displayName || "프로필"}
                            className="h-20 w-20 rounded-full object-cover"
                        />
                    ) : (
                        <span className="h-20 w-20 rounded-full bg-gray-200" aria-hidden />
                    )}

                    <h2 className="mt-3 font-bold text-gray-900">
                        {displayName || "내 프로필"}
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                        마이페이지
                    </p>
                </div>

                <nav className="mt-8 flex flex-col gap-2">
                    <NavLink
                        to="/mypage/profile"
                        className={({ isActive }) =>
                            `rounded-xl px-4 py-3 text-sm font-medium transition ${isActive
                                ? "bg-modam-coral text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`
                        }
                    >
                        기본 프로필 설정
                    </NavLink>

                    <NavLink
                        to="/mypage/clubs"
                        className={({ isActive }) =>
                            `rounded-xl px-4 py-3 text-sm font-medium transition ${isActive
                                ? "bg-modam-coral text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`
                        }
                    >
                        동아리별 프로필 설정
                    </NavLink>

                    <NavLink
                        to="/mypage/feeds"
                        className={({ isActive }) =>
                            `rounded-xl px-4 py-3 text-sm font-medium transition ${isActive
                                ? "bg-modam-coral text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`
                        }
                    >
                        내 피드 목록
                    </NavLink>

                    <NavLink
                        to="/mypage/timeline"
                        className={({ isActive }) =>
                            `rounded-xl px-4 py-3 text-sm font-medium transition ${isActive
                                ? "bg-modam-coral text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`
                        }
                    >
                        타임라인 조회
                    </NavLink>
                </nav>

                <button
                    type="button"
                    onClick={() => setLogoutModalOpen(true)}
                    className="mt-8 w-full rounded-xl border border-red-200 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                >
                    로그아웃
                </button>
            </div>
            <Modal
                open={logoutModalOpen}
                title="로그아웃"
                confirmText="로그아웃"
                cancelText="취소"
                onClose={() => setLogoutModalOpen(false)}
                onConfirm={handleLogout}
            >
                정말 로그아웃하시겠습니까?
            </Modal>
        </aside>
    );
}
