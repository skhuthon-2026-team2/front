export default function FeedFilter({
    keyword,
    setKeyword,
    sort,
    setSort,
}) {
    return (
        <div className="mt-6 flex items-center justify-between">
            <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="제목 또는 작성자 검색"
                className="w-80 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-modam-coral/40"
            />

            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-modam-coral/40"
            >
                <option value="latest">최신순</option>
                <option value="oldest">오래된순</option>
            </select>
        </div>
    );
}