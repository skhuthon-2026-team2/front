import { useMemo, useState } from "react";

import MemberSidebar from "./components/MemberSidebar";
import FeedManageHeader from "./components/FeedManageHeader";
import FeedFilter from "./components/FeedFilter";
import FeedManageCard from "./components/FeedManageCard";

import Modal from "../../components/common/Modal";

import { MOCK_FEEDS } from "./mockFeeds";

export default function FeedManagePage() {
    const [feeds, setFeeds] = useState(MOCK_FEEDS);
    const [selectedFeeds, setSelectedFeeds] = useState([]);

    const [keyword, setKeyword] = useState("");
    const [sort, setSort] = useState("latest");

    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const handleToggle = (id) => {
        if (selectedFeeds.includes(id)) {
            setSelectedFeeds((prev) => prev.filter((feedId) => feedId !== id));
        } else {
            setSelectedFeeds((prev) => [...prev, id]);
        }
    };

    const handleToggleAll = () => {
        if (
            feeds.length > 0 &&
            selectedFeeds.length === feeds.length
        ) {
            setSelectedFeeds([]);
        } else {
            setSelectedFeeds(feeds.map((feed) => feed.id));
        }
    };

    const handleDelete = () => {
        if (selectedFeeds.length === 0) {
            alert("삭제할 게시글을 선택해주세요.");
            return;
        }

        setOpenDeleteModal(true);
    };

    const confirmDelete = () => {
        setFeeds((prev) =>
            prev.filter((feed) => !selectedFeeds.includes(feed.id))
        );

        setSelectedFeeds([]);
        setOpenDeleteModal(false);

        // TODO: 게시글 삭제 API
    };

    const filteredFeeds = useMemo(() => {
        let result = [...feeds];

        // 검색
        if (keyword.trim()) {
            const search = keyword.toLowerCase();

            result = result.filter(
                (feed) =>
                    feed.title.toLowerCase().includes(search) ||
                    feed.author.toLowerCase().includes(search)
            );
        }

        // 정렬
        result.sort((a, b) => {
            const dateA = new Date(a.date.replace(/\./g, "-"));
            const dateB = new Date(b.date.replace(/\./g, "-"));

            if (sort === "latest") {
                return dateB - dateA;
            }

            return dateA - dateB;
        });

        return result;
    }, [feeds, keyword, sort]);

    return (
        <>
            <div className="mx-auto flex w-full max-w-6xl gap-6 px-6 py-8">
                <MemberSidebar />

                <main className="flex-1">
                    <FeedManageHeader
                        total={feeds.length}
                        selected={selectedFeeds.length}
                        onDelete={handleDelete}
                    />

                    <FeedFilter
                        keyword={keyword}
                        setKeyword={setKeyword}
                        sort={sort}
                        setSort={setSort}
                    />

                    <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <div className="flex items-center border-b border-gray-100 bg-gray-50 px-6 py-4">
                            <input
                                type="checkbox"
                                checked={
                                    feeds.length > 0 &&
                                    selectedFeeds.length === feeds.length
                                }
                                onChange={handleToggleAll}
                                className="mr-4 h-5 w-5 accent-[#f79977]"
                            />

                            <p className="font-medium text-gray-700">
                                전체 선택
                            </p>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {filteredFeeds.length > 0 ? (
                                filteredFeeds.map((feed) => (
                                    <FeedManageCard
                                        key={feed.id}
                                        feed={feed}
                                        checked={selectedFeeds.includes(feed.id)}
                                        onToggle={handleToggle}
                                    />
                                ))
                            ) : (
                                <div className="py-20 text-center text-gray-400">
                                    검색 결과가 없습니다.
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            <Modal
                open={openDeleteModal}
                title="게시글 삭제"
                confirmText="삭제"
                cancelText="취소"
                onClose={() => setOpenDeleteModal(false)}
                onConfirm={confirmDelete}
            >
                <p className="leading-6">
                    선택한 게시글 {selectedFeeds.length}개를 삭제하시겠습니까?
                </p>

                <p className="mt-2 text-xs text-gray-400">
                    삭제된 게시글은 복구할 수 없습니다.
                </p>
            </Modal>
        </>
    );
}