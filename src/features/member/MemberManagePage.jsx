import { useMemo, useState } from "react";

import MemberSidebar from "./components/MemberSidebar";
import MemberSearch from "./components/MemberSearch";
import CapacityCard from "./components/CapacityCard";
import MemberTable from "./components/MemberTable";

import { MOCK_MEMBERS } from "./mockMembers";

export default function MemberManagePage() {
    const [keyword, setKeyword] = useState("");
    const [members, setMembers] = useState(MOCK_MEMBERS);
    const [capacity, setCapacity] = useState(30);

    const filteredMembers = useMemo(() => {
        return members.filter((member) =>
            member.name.toLowerCase().includes(keyword.toLowerCase())
        );
    }, [members, keyword]);

    const handleKick = (id) => {
        const ok = window.confirm("정말 내보내시겠습니까?");

        if (!ok) return;

        setMembers((prev) => prev.filter((member) => member.id !== id));
    };

    return (
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
    );
}