export default function FeedCard({ feed }) {
  const images = Array.isArray(feed.imageUrls)
    ? feed.imageUrls
    : feed.imageUrls
    ? feed.imageUrls.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const visible = images.slice(0, 3);
  const remaining = images.length - visible.length;

  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <header className="flex items-center gap-3">
        <img src={feed.writerProfileImage} alt={feed.writerNickname} className="h-10 w-10 rounded-full object-cover" />
        <div>
          <p className="text-sm font-bold text-gray-900">{feed.writerNickname}</p>
          <p className="text-xs text-gray-400">{feed.activityDate}</p>
        </div>
      </header>

      <h3 className="mt-4 font-bold text-gray-900">{feed.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{feed.content}</p>

      {visible.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {visible.map((src, i) => {
            const isLast = i === visible.length - 1 && remaining > 0;
            return (
              <div key={i} className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
                <img src={src} alt="" className="h-full w-full object-cover" />
                {isLast && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-bold text-white">
                    + {remaining}장 더보기
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
}
