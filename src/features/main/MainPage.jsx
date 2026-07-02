import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMyClubs } from "../../apis/club";
import ActionCard from "./components/ActionCard";
import ClubCard from "./components/ClubCard";
import EmptyClubs from "./components/EmptyClubs";
import { PlusIcon, SearchIcon } from "./components/icons";

export default function MainPage() {
  const navigate = useNavigate();

  const { data: myClubs = [], isLoading } = useQuery({
    queryKey: ["my-clubs"],
    queryFn: getMyClubs,
  });

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ActionCard
          accent="coral"
          icon={<PlusIcon />}
          title="동아리 생성하기"
          description="당신만의 주제로 새로운 동아리를 만들고 함께할 팀원을 모집해보세요."
          onClick={() => navigate("/club/create")}
        />
        <ActionCard
          accent="lime"
          icon={<SearchIcon />}
          title="동아리 가입하기"
          description="취향이 맞는 사람들과 소통하고 싶나요? 관심 있는 동아리를 찾아 가입해보세요."
          onClick={() => navigate("/club/join")}
        />
      </div>

      <section className="mt-12">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-gray-900">내가 속한 동아리</h2>
          <span className="text-sm font-medium text-gray-400">{myClubs.length}</span>
        </div>

        {isLoading ? (
          <p className="mt-5 text-sm text-gray-400">불러오는 중...</p>
        ) : myClubs.length === 0 ? (
          <EmptyClubs />
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {myClubs.map((club) => (
              <ClubCard key={club.clubId} club={club} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
