import { useState } from "react";
import MyPageFrame from "./components/MyPageFrame";
import Modal from "../../components/common/Modal";
import { MOCK_CLUB_PROFILES } from "./mockClubProfiles";

export default function ClubProfilePage() {
    const [clubProfiles, setClubProfiles] = useState(MOCK_CLUB_PROFILES);
    const [saveModalOpen, setSaveModalOpen] = useState(false);

    const handleNicknameChange = (id, value) => {
        setClubProfiles((prev) =>
            prev.map((profile) =>
                profile.id === id ? { ...profile, nickname: value } : profile
            )
        );
    };

    const handleSave = () => {
        // TODO: 동아리별 닉네임 변경 API 호출
        setSaveModalOpen(true);
    };

    return (
        <MyPageFrame>
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">
                    동아리별 프로필 설정
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    동아리에서 사용할 닉네임을 변경할 수 있습니다.
                </p>

                <div className="mt-8 flex flex-col gap-4">
                    {clubProfiles.map((profile) => (
                        <div
                            key={profile.id}
                            className="flex items-center gap-5 rounded-2xl border border-gray-100 bg-gray-50 p-5"
                        >
                            <img
                                src={profile.clubImage}
                                alt={profile.clubName}
                                className="h-16 w-16 rounded-xl object-cover"
                            />

                            <div className="min-w-0 flex-1">
                                <h2 className="font-bold text-gray-900">{profile.clubName}</h2>

                                <div className="mt-3 flex items-center gap-3">
                                    <label className="shrink-0 text-sm font-medium text-gray-500">
                                        닉네임
                                    </label>

                                    <input
                                        value={profile.nickname}
                                        onChange={(e) =>
                                            handleNicknameChange(profile.id, e.target.value)
                                        }
                                        placeholder="닉네임을 입력하세요"
                                        className="w-full rounded-xl bg-white px-4 py-3 text-sm outline-none ring-1 ring-gray-200 transition focus:ring-2 focus:ring-modam-coral/40"
                                    />
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => handleSave(profile.id)}
                                disabled={!profile.nickname.trim()}
                                className="rounded-xl bg-modam-coral px-5 py-3 text-sm font-bold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                저장
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                open={saveModalOpen}
                title="저장 완료"
                confirmText="확인"
                cancelText="닫기"
                onClose={() => setSaveModalOpen(false)}
                onConfirm={() => setSaveModalOpen(false)}
            >
                닉네임이 저장되었습니다.
            </Modal>
        </MyPageFrame>
    );
}