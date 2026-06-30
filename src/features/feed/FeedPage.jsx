import { useState } from "react";
import ClubSidebar from "../club/components/ClubSidebar";
import ActivityCalendar from "./components/ActivityCalendar";
import MemberList from "./components/MemberList";
import FeedCard from "./components/FeedCard";

const CLUB = {
  id: 1,
  name: "연세 사진 동아리 '찰나'",
  description: "평범한 일상을 특별한 기록으로 남기는 사진 예술 동아리입니다.",
  image: "https://picsum.photos/seed/chalna/400/300",
  role: "회장",
  memberCount: 42,
  postCount: 128,
};

const MEMBERS = [
  { id: 1, name: "박준형", status: "오늘 3개의 기록을 남겼어요", avatar: "https://i.pravatar.cc/80?img=12" },
  { id: 2, name: "이동욱", status: "최근에 가입했어요", avatar: "https://i.pravatar.cc/80?img=33" },
  { id: 3, name: "최지원", status: "12일 연속 기록 중", avatar: "https://i.pravatar.cc/80?img=45" },
  { id: 4, name: "한소희", status: "풍경 사진의 대가", avatar: "https://i.pravatar.cc/80?img=20" },
];

const FEEDS = [
  {
    id: 1,
    author: { name: "박준형", avatar: "https://i.pravatar.cc/80?img=12" },
    createdAt: "2026.05.03",
    title: "노을지는 한강의 순간들을 담아봤어요",
    content:
      "이번 정기 출사는 반포 한강 공원에서 진행했습니다. 날씨가 너무 맑아서 노을이 정말 예쁘게 졌어요. 다들 셔터 누르느라 정신 없었던 즐거운 시간이었습니다.",
    images: [
      "https://picsum.photos/seed/sunset/400/400",
      "https://picsum.photos/seed/people/400/400",
      "https://picsum.photos/seed/camera/400/400",
      "https://picsum.photos/seed/extra1/400/400",
      "https://picsum.photos/seed/extra2/400/400",
    ],
  },
  {
    id: 2,
    author: { name: "이지민", avatar: "https://i.pravatar.cc/80?img=5" },
    createdAt: "2026.05.06",
    title: "인물 사진 조명 활용법 스터디",
    content:
      "동아리방에서 진행된 조명 스터디! 3점 조명의 기초부터 실습까지 알찬 시간이었습니다.",
    images: [],
  },
];

export default function FeedPage() {
  // null이면 전체. { start } 면 하루, { start, end } 면 기간.
  const [range, setRange] = useState(null);

  const handleSelect = (dateStr) => {
    if (dateStr === null) {
      setRange(null);
    } else if (!range?.start || range.end) {
      // 선택 없음 or 이미 기간 완성된 상태 → 새로 시작일 지정
      setRange({ start: dateStr });
    } else {
      // 시작일만 있는 상태 → 종료일 지정 (순서 자동 정렬)
      const [start, end] = [range.start, dateStr].sort();
      setRange({ start, end });
    }
  };

  const postedDays = FEEDS.map((f) => f.createdAt);

  const filteredFeeds = !range?.start
    ? FEEDS
    : FEEDS.filter((f) => {
        const end = range.end ?? range.start;
        return f.createdAt >= range.start && f.createdAt <= end;
      });

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-6 px-6 py-8">
      <div className="flex w-full max-w-[260px] shrink-0 flex-col gap-4">
        <ClubSidebar club={CLUB} />
        <ActivityCalendar
          year={2026}
          month={5}
          postedDays={postedDays}
          range={range}
          onSelect={handleSelect}
        />
        <MemberList members={MEMBERS} totalCount={CLUB.memberCount} />
      </div>

      <main className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">최근 활동 피드</h1>
          {range?.start && (
            <span className="text-sm text-modam-coral">
              {range.start}
              {range.end ? ` ~ ${range.end}` : ""}
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {filteredFeeds.length > 0 ? (
            filteredFeeds.map((feed) => <FeedCard key={feed.id} feed={feed} />)
          ) : (
            <div className="rounded-2xl border border-gray-100 bg-white py-16 text-center text-sm text-gray-400">
              선택한 날짜에 올라온 글이 없어요.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
