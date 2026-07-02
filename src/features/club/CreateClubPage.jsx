import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClub } from "../../apis/club";

const MAX_NAME = 20;
const MAX_DESC = 100;
const CAPACITY_OPTIONS = [10, 20, 30, 40, 50, 100];
const MAX_IMAGE_MB = 5;

export default function CreateClubPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState(10);
  const [preview, setPreview] = useState("");

  const createClubMutation = useMutation({
    mutationFn: (payload) => createClub(payload),
    onSuccess: async (createdClub) => {
      if (createdClub?.clubId) {
        queryClient.setQueryData(["my-clubs"], (prev = []) => {
          if (!Array.isArray(prev)) return [createdClub];
          if (prev.some((club) => club.clubId === createdClub.clubId)) return prev;
          return [createdClub, ...prev];
        });
      }
      await queryClient.invalidateQueries({ queryKey: ["my-clubs"] });
      navigate("/main", { replace: true });
    },
    onError: () => {
      alert("동아리 생성에 실패했어요. 잠시 후 다시 시도해주세요.");
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      alert(`이미지는 최대 ${MAX_IMAGE_MB}MB까지 업로드할 수 있어요.`);
      return;
    }
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    const trimmedName = name.trim();
    if (!trimmedName || createClubMutation.isPending) return;

    createClubMutation.mutate({
      clubName: trimmedName,
      description: description.trim(),
      capacity,
    });
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-10">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-sm text-gray-400 transition-colors hover:text-gray-600"
      >
        ← 돌아가기
      </button>

      <h1 className="mt-3 text-2xl font-bold text-gray-900">새로운 동아리 만들기</h1>
      <p className="mt-1.5 text-sm text-gray-500">
        당신만의 특별한 모임을 시작해보세요. 멋진 설명은 더 많은 멤버를 모을 수 있게 도와줍니다.
      </p>

      <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <label className="font-bold text-gray-900">동아리명</label>
          <span className="text-xs text-gray-400">{name.length}/{MAX_NAME}</span>
        </div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={MAX_NAME}
          placeholder="동아리 이름을 입력해주세요"
          className="mt-2 w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none transition-colors focus:bg-gray-50 focus:ring-2 focus:ring-modam-coral/40"
        />

        <div className="mt-6 flex items-center justify-between">
          <label className="font-bold text-gray-900">동아리 설명</label>
          <span className="text-xs text-gray-400">{description.length}/{MAX_DESC}</span>
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={MAX_DESC}
          rows={5}
          placeholder="동아리의 목적, 활동 계획, 가입 조건 등을 자유롭게 작성해주세요."
          className="mt-2 w-full resize-none rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none transition-colors focus:bg-gray-50 focus:ring-2 focus:ring-modam-coral/40"
        />

        <label className="mt-6 block font-bold text-gray-900">최대 인원</label>
        <div className="relative mt-2">
          <select
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            className="w-full appearance-none rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none transition-colors focus:bg-gray-50 focus:ring-2 focus:ring-modam-coral/40"
          >
            {CAPACITY_OPTIONS.map((n) => (
              <option key={n} value={n}>{n}명</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </div>

        <label className="mt-6 block font-bold text-gray-900">대표 이미지</label>
        <label className="mt-2 flex aspect-video max-w-xs cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50 text-gray-400 transition-colors hover:border-modam-coral/60">
          {preview ? (
            <img src={preview} alt="대표 이미지 미리보기" className="h-full w-full object-cover" />
          ) : (
            <>
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.5-3.5L9 20" />
              </svg>
              <span className="mt-2 text-xs">이미지 업로드</span>
            </>
          )}
          <input type="file" accept="image/png,image/jpeg" onChange={handleImageChange} className="hidden" />
        </label>
        <p className="mt-2 text-xs text-gray-400">JPG, PNG 파일 (최대 5MB, 16:9 권장)</p>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!name.trim() || createClubMutation.isPending}
          className="mt-8 w-full rounded-xl bg-modam-coral py-3.5 text-[15px] font-bold text-white transition hover:brightness-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {createClubMutation.isPending ? "생성 중..." : "동아리 생성하기"}
        </button>
        <p className="mt-3 text-center text-xs text-gray-400">
          생성 버튼을 누르면 동아리 개설 및 운영 정책에 동의하는 것으로 간주됩니다.
        </p>
      </div>
    </div>
  );
}
