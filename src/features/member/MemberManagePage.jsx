import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import MemberSidebar from "./components/MemberSidebar";
import MemberSearch from "./components/MemberSearch";
import CapacityCard from "./components/CapacityCard";
import MemberTable from "./components/MemberTable";
import Modal from "../../components/common/Modal";

import { getClubMembers, deleteClubMember } from "../../apis/memberApi";

export default function MemberManagePage() {
    const { clubId } = useParams();

    const [keyword, setKeyword] = useState("");
    const [members, setMembers] = useState([]);
    const [capacity, setCapacity] = useState(30);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [kickTarget, setKickTarget] = useState(null);

    const loadMembers = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await getClubMembers(clubId);

            const content = res.data.data.content;

            const mappedMembers = content.map((member) => ({
                id: member.clubMemberId,
                name: member.nickname,
                avatar: member.profileImage || "https://i.pravatar.cc/150?img=47",
                role: member.role === "OWNER" ? "회장" : "일반회원",
                joinedAt: "-",
            }));

            setMembers(mappedMembers);
        } catch (err) {
            console.error(err);
            setError("멤버 목록을 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (clubId) {
            loadMembers();
        }
    }, [clubId]);

    const filteredMembers = useMemo(() => {
        return members.filter((member) =>
            member.name.toLowerCase().includes(keyword.toLowerCase())
        );
    }, [members, keyword]);

    const handleKick = (id) => {
        setKickTarget(id);
    };

    const confirmKick = async () => {
        try {
            await deleteClubMember(clubId, kickTarget);

            setKickTarget(null);
            await loadMembers();
        } catch (err) {
            console.error(err);
            setKickTarget(null);
            alert("멤버 내보내기에 실패했습니다.");
        }
    };

    return (
        <>
            <div className="mx-auto flex w-full max-w-6xl gap-6 px-6 py-8">
                <MemberSidebar />

                <main className="flex-1">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">멤버 관리</h1>

                            <p className="mt-2 text-sm text-gray-500">
                                현재 동아리 멤버를 관리할 수 있습니다.
                            </p>
                        </div>

                        <CapacityCard
                            current={members.length}
                            capacity={capacity}
                            setCapacity={setCapacity}
                        />
                    </div>

                    <div className="mt-7">
                        <MemberSearch keyword={keyword} setKeyword={setKeyword} />
                    </div>

                    <div className="mt-6">
                        {loading ? (
                            <div className="rounded-2xl border border-gray-100 bg-white py-20 text-center text-gray-400 shadow-sm">
                                멤버 목록을 불러오는 중입니다.
                            </div>
                        ) : error ? (
                            <div className="rounded-2xl border border-gray-100 bg-white py-20 text-center text-red-400 shadow-sm">
                                {error}
                            </div>
                        ) : (
                            <MemberTable members={filteredMembers} onKick={handleKick} />
                        )}
                    </div>
                </main>
            </div>

            <Modal
                open={kickTarget !== null}
                title="멤버 내보내기"
                confirmText="내보내기"
                cancelText="취소"
                onClose={() => setKickTarget(null)}
                onConfirm={confirmKick}
            >
                <p className="leading-6">
                    정말 이 멤버를 동아리에서 내보내시겠습니까?
                </p>

                <p className="mt-2 text-xs text-gray-400">
                    내보낸 멤버는 다시 가입 신청을 해야 합니다.
                </p>
            </Modal>
        </>
    );
}