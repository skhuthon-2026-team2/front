export default function FeedFilter() {
    return (
        <div className="mt-6 flex items-center justify-between">
            <input
                placeholder="제목 또는 작성자 검색"
                className="w-80 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-modam-coral/40"
            />

            <select className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none">
                <option>최신순</option>
                <option>오래된순</option>
            </select>
        </div>
    );
}