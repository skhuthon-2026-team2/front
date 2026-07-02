import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getClub, getClubMembers } from "../../apis/club";
import { getClubPosts } from "../../apis/post";
import ClubSidebar from "../club/components/ClubSidebar";
import ActivityCalendar from "./components/ActivityCalendar";
import MemberList from "./components/MemberList";
import FeedCard from "./components/FeedCard";

export default function FeedPage() {
  const { clubId } = useParams();
  const [range, setRange] = useState(null);

  const { data: club } = useQuery({
    queryKey: ["club", clubId],
    queryFn: () => getClub(clubId),
  });

  const { data: posts = [] } = useQuery({
    queryKey: ["club-posts", clubId],
    queryFn: () => getClubPosts(clubId),
  });

  const { data: members = [] } = useQuery({
    queryKey: ["club-members", clubId],
    queryFn: () => getClubMembers(clubId),
  });

  const handleSelect = (dateStr) => {
    if (dateStr === null) setRange(null);
    else if (!range?.start || range.end) setRange({ start: dateStr });
    else {
      const [start, end] = [range.start, dateStr].sort();
      setRange({ start, end });
    }
  };

  // activityDate(YYYY-MM-DD) → 캘린더/필터는 YYYY.MM.DD 형식이라 변환
  const toDot = (d) => (d ? d.replaceAll("-", ".") : "");
  const postedDays = posts.map((p) => toDot(p.activityDate)).filter(Boolean);

  const filteredPosts = !range?.start
    ? posts
    : posts.filter((p) => {
        const d = toDot(p.activityDate);
        const end = range.end ?? range.start;
        return d >= range.start && d <= end;
      });

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-6 px-6 py-8">
      <div className="flex w-full max-w-[260px] shrink-0 flex-col gap-4">
        {club && <ClubSidebar club={club} />}
        <ActivityCalendar year={2026} month={5} postedDays={postedDays} range={range} onSelect={handleSelect} />
        <MemberList members={members} totalCount={club?.currentMembers ?? members.length} />
      </div>

      <main className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">최근 활동 피드</h1>
          {range?.start && (
            <span className="text-sm text-modam-coral">
              {range.start}{range.end ? ` ~ ${range.end}` : ""}
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <FeedCard key={post.postId} feed={post} />)
          ) : (
            <div className="rounded-2xl border border-gray-100 bg-white py-16 text-center text-sm text-gray-400">
              아직 올라온 글이 없어요.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
