import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/common/Modal";
import InviteCodeInput from "./components/InviteCodeInput";
import ClubPreviewCard from "./components/ClubPreviewCard";

const MOCK_CLUB = {
  id: 1,
  name: "심야 독서회 '문장들'",
  description: "매주 목요일 밤, 우리가 사랑한 문장들을 나눕니다.",
  image: "https://picsum.photos/seed/munjang/640/400",
  memberCount: 12,
  capacity: 20,
  createdAt: "2026.01",
};

const VALID_CODE = "MD2640";

export default function JoinClubPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [club, setClub] = useState(null);
  const [error, setError] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleVerify = () => {
    if (code === VALID_CODE) {
      setClub(MOCK_CLUB);
      setError("");
    } else {
      setClub(null);
      setError("존재하지 않는 초대 코드예요. 다시 확인해주세요.");
    }
  };

  const handleConfirmJoin = () => {
    setConfirmOpen(false);
    navigate("/club/join/nickname");
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-900">초대 코드로 가입하기</h1>
      <p className="mt-1.5 text-sm text-gray-500">
        전달받은 6자리 초대 코드를 입력하여 동아리에 합류하세요.
      </p>

      <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
        <p className="font-bold text-gray-900">초대 코드 입력</p>
        <p className="mt-1 text-xs text-gray-400">숫자와 영문 대문자 조합 6자리를 입력해주세요</p>

        <div className="mt-5">
          <InviteCodeInput onChange={setCode} />
        </div>

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        <button
          type="button"
          onClick={handleVerify}
          disabled={code.length < 6}
          className="mt-6 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          코드 확인하기
        </button>
      </div>

      {club && (
        <div className="mt-6">
          <ClubPreviewCard club={club} onSelect={() => setConfirmOpen(true)} />
        </div>
      )}

      <Modal
        open={confirmOpen}
        title="동아리 가입"
        confirmText="가입하기"
        cancelText="취소"
        onConfirm={handleConfirmJoin}
        onClose={() => setConfirmOpen(false)}
      >
        <b>{club?.name}</b>에 가입하시겠어요?
      </Modal>
    </div>
  );
}
