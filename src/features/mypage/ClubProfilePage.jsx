import { useEffect, useState } from "react";

import MyPageFrame from "./components/MyPageFrame";
import Modal from "../../components/common/Modal";

import { getMyProfile, updateClubProfile } from "../../apis/mypageApi";

export default function ClubProfilePage() {
    const [clubProfiles, setClubProfiles] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [saveModalOpen, setSaveModalOpen] = useState(false);

    const loadClubProfiles = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getMyProfile();

            const profiles = (data.myClubs ?? []).map((club) => ({
                clubId: club.clubId,
                clubMemberId: club.clubMemberId,
                clubName: club.clubName,
                nickname: club.clubNickname,
                role: club.clubRole,
            }));

            setClubProfiles(profiles);
        } catch (err) {
            console.error(err);
            setError("동아리별 프로필을 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadClubProfiles();
    }, []);

    const handleNicknameChange = (clubId, value) => {
        setClubProfiles((prev) =>
            prev.map((profile) =>
                profile.clubId === clubId
                    ? { ...profile, nickname: value }
                    : profile
            )
        );
    };

    const handleSave = async (profile) => {
        try {
            await updateClubProfile(
                profile.clubId,
                profile.clubMemberId,
                profile.nickname
            );

            setSaveModalOpen(true);
        } catch (err) {
            console.error(err);
            setError("닉네임 저장에 실패했습니다.");
        }
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

                {loading && (
                    <p className="mt-6 text-sm text-gray-400">
                        동아리별 프로필을 불러오는 중입니다.
                    </p>
                )}

                {error && (
                    <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-500">
                        {error}
                    </p>
                )}

                {!loading && !error && (
                    <div className="mt-8 flex flex-col gap-4">
                        {clubProfiles.map((profile) => (
                            <div
                                key={profile.clubId}
                                className="flex items-center gap-5 rounded-2xl border border-gray-100 bg-gray-50 p-5"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-modam-coral/10 text-sm font-bold text-modam-coral">
                                    {profile.clubName?.charAt(0)}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <h2 className="font-bold text-gray-900">
                                            {profile.clubName}
                                        </h2>

                                        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-500">
                                            {profile.role === "OWNER" ? "회장" : "일반회원"}
                                        </span>
                                    </div>

                                    <div className="mt-3 flex items-center gap-3">
                                        <label className="shrink-0 text-sm font-medium text-gray-500">
                                            닉네임
                                        </label>

                                        <input
                                            value={profile.nickname}
                                            onChange={(e) =>
                                                handleNicknameChange(profile.clubId, e.target.value)
                                            }
                                            placeholder="닉네임을 입력하세요"
                                            className="w-full rounded-xl bg-white px-4 py-3 text-sm outline-none ring-1 ring-gray-200 transition focus:ring-2 focus:ring-modam-coral/40"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleSave(profile)}
                                    disabled={!profile.nickname.trim()}
                                    className="rounded-xl bg-modam-coral px-5 py-3 text-sm font-bold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    저장
                                </button>
                            </div>
                        ))}

                        {clubProfiles.length === 0 && (
                            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-16 text-center text-sm text-gray-400">
                                가입한 동아리가 없습니다.
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Modal
                open={saveModalOpen}
                title="저장 완료"
                confirmText="확인"
                cancelText={null}
                onClose={() => setSaveModalOpen(false)}
                onConfirm={() => setSaveModalOpen(false)}
            >
                닉네임이 저장되었습니다.
            </Modal>
        </MyPageFrame>
    );
}