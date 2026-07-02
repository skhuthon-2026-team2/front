import { useState } from "react";
import MyPageFrame from "./components/MyPageFrame";
import Modal from "../../components/common/Modal";
import { useUserStore } from "../../stores/userStore";

const MAX_IMAGE_MB = 5;

export default function BasicProfilePage() {
    const { user, setProfileImage } = useUserStore();

    const [preview, setPreview] = useState(user.profileImage);
    const [saveModalOpen, setSaveModalOpen] = useState(false);
    const [imageErrorModalOpen, setImageErrorModalOpen] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
            setImageErrorModalOpen(true);
            return;
        }

        const imageUrl = URL.createObjectURL(file);

        setPreview(imageUrl);
    };

    const handleSave = () => {
        setProfileImage(preview);
        setSaveModalOpen(true);
    };

    return (
        <MyPageFrame>
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">기본 프로필 설정</h1>

                <p className="mt-2 text-sm text-gray-500">
                    기본 프로필 정보를 변경할 수 있습니다.
                </p>

                <div className="mt-8">
                    <label className="block font-bold text-gray-900">프로필 사진</label>

                    <div className="mt-4 flex items-center gap-6">
                        <img
                            src={preview}
                            alt="프로필"
                            className="h-28 w-28 rounded-full object-cover"
                        />

                        <label className="cursor-pointer rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium transition hover:bg-gray-50">
                            사진 변경
                            <input
                                type="file"
                                accept="image/png,image/jpeg"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>

                    <p className="mt-2 text-xs text-gray-400">JPG, PNG (최대 5MB)</p>
                </div>

                <div className="mt-8">
                    <label className="block font-bold text-gray-900">이름</label>

                    <input
                        value={user.name}
                        disabled
                        className="mt-2 w-full rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-500 outline-none"
                    />

                    <p className="mt-2 text-xs text-gray-400">
                        카카오 로그인 이름은 변경할 수 없습니다.
                    </p>
                </div>

                <div className="mt-6">
                    <label className="block font-bold text-gray-900">이메일</label>

                    <input
                        value={user.email}
                        disabled
                        className="mt-2 w-full rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-500 outline-none"
                    />
                </div>

                <button
                    type="button"
                    onClick={handleSave}
                    className="mt-10 w-full rounded-xl bg-modam-coral py-3.5 text-sm font-bold text-white transition hover:brightness-95"
                >
                    저장하기
                </button>
            </div>

            <Modal
                open={saveModalOpen}
                title="저장 완료"
                confirmText="확인"
                cancelText={null}
                onClose={() => setSaveModalOpen(false)}
                onConfirm={() => setSaveModalOpen(false)}
            >
                기본 프로필이 저장되었습니다.
            </Modal>

            <Modal
                open={imageErrorModalOpen}
                title="업로드 실패"
                confirmText="확인"
                cancelText={null}
                onClose={() => setImageErrorModalOpen(false)}
                onConfirm={() => setImageErrorModalOpen(false)}
            >
                이미지는 최대 {MAX_IMAGE_MB}MB까지 업로드 가능합니다.
            </Modal>
        </MyPageFrame>
    );
}