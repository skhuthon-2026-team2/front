import { useEffect, useState } from "react";

import MyPageFrame from "./components/MyPageFrame";
import { getMyTimelines } from "../../apis/mypageApi";

export default function TimelinePage() {
    const [timelines, setTimelines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadTimelines = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getMyTimelines();
            const content = data.content ?? [];

            const mappedTimelines = content.map((timeline) => ({
                id: timeline.timelineId,
                title: timeline.title,
                clubId: timeline.clubId,
                clubName: timeline.clubName,
                image:
                    timeline.representativeImageUrl ||
                    "https://picsum.photos/seed/timeline-default/600/400",
            }));

            setTimelines(mappedTimelines);
        } catch (err) {
            console.error(err);
            setError("타임라인 목록을 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTimelines();
    }, []);

    return (
        <MyPageFrame>
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">
                    나의 타임라인
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    지금까지 기록한 소중한 순간들을 한눈에 확인하세요.
                </p>

                <div className="mt-8">
                    {loading ? (
                        <div className="py-20 text-center text-gray-400">
                            타임라인 목록을 불러오는 중입니다.
                        </div>
                    ) : error ? (
                        <div className="py-20 text-center text-red-400">
                            {error}
                        </div>
                    ) : timelines.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {timelines.map((timeline) => (
                                <div
                                    key={timeline.id}
                                    className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                >
                                    <img
                                        src={timeline.image}
                                        alt={timeline.title}
                                        className="h-44 w-full object-cover"
                                    />

                                    <div className="p-5">
                                        <p className="text-sm font-semibold text-modam-coral">
                                            {timeline.clubName}
                                        </p>

                                        <h2 className="mt-2 text-lg font-bold text-gray-900">
                                            {timeline.title}
                                        </h2>

                                        <div className="mt-5 flex justify-end">
                                            <button
                                                type="button"
                                                className="text-sm font-bold text-modam-coral"
                                            >
                                                자세히 보기 ›
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                                🗓️
                            </div>

                            <h3 className="mt-4 font-bold text-gray-900">
                                참여한 타임라인이 없습니다
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                동아리에서 타임라인을 만들면 이곳에서 확인할 수 있어요.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </MyPageFrame>
    );
}