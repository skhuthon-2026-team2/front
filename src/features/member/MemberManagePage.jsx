import { useMemo, useState } from "react";

import MemberSidebar from "./components/MemberSidebar";
import MemberSearch from "./components/MemberSearch";
import CapacityCard from "./components/CapacityCard";
import MemberTable from "./components/MemberTable";

import Modal from "../../components/common/Modal";

import { MOCK_MEMBERS } from "./mockMembers";

export default function MemberManagePage() {
    const [keyword, setKeyword] = useState("");
    const [members, setMembers] = useState(MOCK_MEMBERS);
    const [capacity, setCapacity] = useState(30);

    const [kickTarget, setKickTarget] = useState(null);

    const filteredMembers = useMemo(() => {
        return members.filter((member) =>
            member.name.toLowerCase().includes(keyword.toLowerCase())
        );
    }, [members, keyword]);

    const handleKick = (id) => {
        setKickTarget(id);
    };

    const confirmKick = () => {
        setMembers((prev) =>
            prev.filter((member) => member.id !== kickTarget)
        );

        setKickTarget(null);
    };

    return (
        <>
            <div className="mx-auto flex w-full max-w-6xl gap-6 px-6 py-8">
                <MemberSidebar />

                <main className="flex-1">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">
                                멤버 관리
                            </h1>

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
                        <MemberSearch
                            keyword={keyword}
                            setKeyword={setKeyword}
                        />
                    </div>

                    <div className="mt-6">
                        <MemberTable
                            members={filteredMembers}
                            onKick={handleKick}
                        />
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