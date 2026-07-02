import { useNavigate } from "react-router-dom";
import { CrownIcon } from "./icons";

export default function ClubCard({ club }) {
  const navigate = useNavigate();
  const isOwner = club.role === "OWNER"; 

  return (
    <button
      type="button"
      onClick={() => navigate(`/club/${club.clubId}/feed`)}
      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white text-left transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {club.clubImageUrl && (
          <img
            src={club.clubImageUrl}
            alt={club.clubName}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        {isOwner && (
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-modam-coral px-2.5 py-1 text-xs font-medium text-white">
            <CrownIcon />
            회장
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900">{club.clubName}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-gray-500">{club.description}</p>
        <p className="mt-2 text-xs text-gray-400">멤버 {club.currentMembers}명</p>
      </div>
    </button>
  );
}
