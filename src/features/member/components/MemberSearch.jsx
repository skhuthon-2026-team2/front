export default function MemberSearch({
    keyword,
    setKeyword,
}) {
    return (
        <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="멤버 검색"
            className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 outline-none focus:ring-2 focus:ring-modam-coral/40"
        />
    );
}