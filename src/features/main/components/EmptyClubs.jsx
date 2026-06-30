import { useNavigate } from "react-router-dom";
import { UsersIcon } from "./icons";

export default function EmptyClubs() {
  const navigate = useNavigate();

  return (
    <div className="mt-5 flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        <UsersIcon />
      </div>
      <p className="mt-5 font-bold text-gray-800">아직 소속된 동아리가 없어요</p>
      <p className="mt-1.5 text-sm text-gray-400">취미를 공유할 친구들을 찾아 떠나볼까요?</p>
      <button
        type="button"
        onClick={() => navigate("/club/join")}
        className="mt-6 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
      >
        동아리 가입하기
      </button>
    </div>
  );
}
