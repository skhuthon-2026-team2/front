import MyPageFrame from "./components/MyPageFrame";

export default function TimelinePage() {
    return (
        <MyPageFrame>
            <div className="flex min-h-[500px] flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-modam-coral/10 text-2xl">
                    🗓️
                </div>

                <h1 className="mt-5 text-2xl font-bold text-gray-900">
                    타임라인 조회 페이지
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    타임라인 기능은 추후 업데이트될 예정입니다.
                </p>
            </div>
        </MyPageFrame>
    );
}