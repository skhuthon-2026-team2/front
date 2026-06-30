// 왼쪽 사이드바
import { NavLink, useParams } from "react-router-dom";

export default function MemberSidebar() {
    const { clubId } = useParams();

    return (
        <aside className="w-[250px] shrink-0">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="font-bold text-gray-900">
                    연세 사진 동아리 '찰나'
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    운영자 메뉴
                </p>

                <nav className="mt-6 flex flex-col gap-2">
                    <NavLink
                        to={`/club/${clubId}/members`}
                        end
                        className={({ isActive }) =>
                            `rounded-xl px-4 py-3 text-sm font-medium transition ${isActive
                                ? "bg-modam-coral text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`
                        }
                    >
                        👥 멤버 관리
                    </NavLink>

                    <NavLink
                        to={`/club/${clubId}/members/feed`}
                        className={({ isActive }) =>
                            `rounded-xl px-4 py-3 text-sm font-medium transition ${isActive
                                ? "bg-modam-coral text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`
                        }
                    >
                        📰 피드 관리
                    </NavLink>
                </nav>
            </div>

            <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900">
                    운영자 권한
                </h3>

                <ul className="mt-3 space-y-2 text-sm text-gray-500">
                    <li>✓ 멤버 관리</li>
                    <li>✓ 게시글 삭제</li>
                </ul>
            </div>
        </aside>
    );
}