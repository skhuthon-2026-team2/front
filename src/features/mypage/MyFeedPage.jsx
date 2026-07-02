import { useEffect, useState } from "react";

import MyPageFrame from "./components/MyPageFrame";
import { getMyFeeds } from "../../apis/mypageApi";

export default function MyFeedPage() {
    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadFeeds = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getMyFeeds();

            const content = data.content ?? [];

            const mappedFeeds = content.map((feed) => ({
                id: feed.postId,
                clubId: feed.clubId,
                title: feed.title,
                content: feed.content,
                author: feed.writerNickname,
                thumbnail:
                    feed.imageUrls ||
                    "https://picsum.photos/seed/my-feed-default/500/300",
                date: feed.activityDate || feed.createdAt?.slice(0, 10) || "-",
            }));

            setFeeds(mappedFeeds);
        } catch (err) {
            console.error(err);
            setError("내 피드 목록을 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFeeds();
    }, []);

    return (
        <MyPageFrame>
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">내 피드 목록</h1>

                <p className="mt-2 text-sm text-gray-500">
                    내가 작성한 피드를 확인할 수 있습니다.
                </p>

                <div className="mt-8">
                    {loading ? (
                        <div className="py-20 text-center text-gray-400">
                            내 피드 목록을 불러오는 중입니다.
                        </div>
                    ) : error ? (
                        <div className="py-20 text-center text-red-400">
                            {error}
                        </div>
                    ) : feeds.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {feeds.map((feed) => (
                                <div
                                    key={feed.id}
                                    className="flex gap-5 rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:bg-gray-100"
                                >
                                    <img
                                        src={feed.thumbnail}
                                        alt={feed.title}
                                        className="h-28 w-40 shrink-0 rounded-xl object-cover"
                                    />

                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-semibold text-modam-coral">
                                            동아리 #{feed.clubId}
                                        </p>

                                        <h2 className="mt-1 text-lg font-bold text-gray-900">
                                            {feed.title}
                                        </h2>

                                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                                            {feed.content}
                                        </p>

                                        <div className="mt-3 flex gap-4 text-xs text-gray-400">
                                            <span>작성자 {feed.author}</span>
                                            <span>작성일 {feed.date}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                                📝
                            </div>

                            <h3 className="mt-4 font-bold text-gray-900">
                                작성한 피드가 없습니다
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                동아리 활동을 기록하면 이곳에서 확인할 수 있어요.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </MyPageFrame>
    );
}