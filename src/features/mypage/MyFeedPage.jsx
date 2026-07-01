import MyPageFrame from "./components/MyPageFrame";
import { MOCK_MY_FEEDS } from "./mockMyFeeds";

export default function MyFeedPage() {
    return (
        <MyPageFrame>
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">내 피드 목록</h1>

                <p className="mt-2 text-sm text-gray-500">
                    내가 작성한 피드를 확인할 수 있습니다.
                </p>

                <div className="mt-8 flex flex-col gap-4">
                    {MOCK_MY_FEEDS.map((feed) => (
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
                                    {feed.clubName}
                                </p>

                                <h2 className="mt-1 text-lg font-bold text-gray-900">
                                    {feed.title}
                                </h2>

                                <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                                    {feed.content}
                                </p>

                                <p className="mt-3 text-xs text-gray-400">
                                    작성일 {feed.date}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MyPageFrame>
    );
}