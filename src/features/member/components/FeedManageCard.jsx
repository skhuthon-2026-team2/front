export default function FeedManageCard({
    feed,
    checked,
    onToggle,
}) {
    return (
        <div className="flex items-center gap-5 px-6 py-5 transition hover:bg-gray-50">
            <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(feed.id)}
                className="h-5 w-5 accent-[#f79977]"
            />

            <img
                src={feed.thumbnail}
                alt={feed.title}
                className="h-24 w-36 rounded-xl object-cover"
            />

            <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900">
                    {feed.title}
                </h2>

                <div className="mt-2 flex gap-6 text-sm text-gray-500">
                    <span>
                        작성자
                        <span className="ml-1 font-medium text-gray-700">
                            {feed.author}
                        </span>
                    </span>

                    <span>
                        작성일
                        <span className="ml-1 font-medium text-gray-700">
                            {feed.date}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}