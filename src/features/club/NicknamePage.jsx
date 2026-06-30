import { useState } from "react";

export default function NicknamePage() {
  const [nickname, setNickname] = useState("");

  const handleJoin = () => {
    // TODO: 별명과 함께 가입 API 호출
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-6 py-20">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <h2 className="font-bold text-gray-900">별명 입력</h2>

        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="동아리에서 사용할 별명을 입력하세요"
          className="mt-5 w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none transition-colors focus:bg-gray-50 focus:ring-2 focus:ring-modam-coral/40"
        />

        <button
          type="button"
          onClick={handleJoin}
          disabled={!nickname.trim()}
          className="mt-5 w-full rounded-xl bg-gray-900 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          동아리 가입하기
        </button>
      </div>
    </div>
  );
}
