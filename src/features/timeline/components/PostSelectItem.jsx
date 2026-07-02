export default function PostSelectItem({ post, checked, onToggle }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(post.id)}
      className={`flex w-full items-center gap-4 rounded-2xl border bg-white p-3 text-left transition-colors ${
        checked ? "border-modam-coral ring-1 ring-modam-coral/30" : "border-gray-100 hover:border-gray-200"
      }`}
    >
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          checked ? "border-modam-coral bg-modam-coral text-white" : "border-gray-300"
        }`}
      >
        {checked && (
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
      </span>

      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
        {post.thumbnail && <img src={post.thumbnail} alt="" className="h-full w-full object-cover" />}
      </div>

      <div className="min-w-0">
        <p className="truncate font-bold text-gray-900">{post.title}</p>
        <p className="mt-0.5 text-sm text-gray-400">
          {post.date} {post.time}
        </p>
      </div>
    </button>
  );
}
