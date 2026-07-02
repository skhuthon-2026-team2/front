import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import MemberSidebar from "./components/MemberSidebar";
import FeedManageHeader from "./components/FeedManageHeader";
import FeedFilter from "./components/FeedFilter";
import FeedManageCard from "./components/FeedManageCard";

import Modal from "../../components/common/Modal";

import { getClubPosts, deletePost } from "../../apis/postApi";

export default function FeedManagePage() {
    const { clubId } = useParams();

    const [feeds, setFeeds] = useState([]);
    const [selectedFeeds, setSelectedFeeds] = useState([]);

    const [keyword, setKeyword] = useState("");
    const [sort, setSort] = useState("latest");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const loadFeeds = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await getClubPosts(clubId);

            const rawFeeds = res.data.data?.content ?? res.data.data ?? [];

            const mappedFeeds = rawFeeds.map((post) => ({
                id: post.postId,
                title: post.title,
                author: post.authorNickname || post.nickname || "작성자",
                date: post.createdAt || post.date || "-",
                thumbnail:
                    post.thumbnail ||
                    post.thumbnailUrl ||
                    post.imageUrl ||
                    "https://picsum.photos/seed/default-feed/500/300",
                content: post.content || "",
            }));

            setFeeds(mappedFeeds);
        } catch (err) {
            console.error(err);
            setError("피드 목록을 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (clubId) {
            loadFeeds();
        }
    }, [clubId]);

    const handleToggle = (id) => {
        if (selectedFeeds.includes(id)) {
            setSelectedFeeds((prev) => prev.filter((feedId) => feedId !== id));
        } else {
            setSelectedFeeds((prev) => [...prev, id]);
        }
    };

    const filteredFeeds = useMemo(() => {
        let result = [...feeds];

        if (keyword.trim()) {
            const search = keyword.toLowerCase();

            result = result.filter(
                (feed) =>
                    feed.title.toLowerCase().includes(search) ||
                    feed.author.toLowerCase().includes(search)
            );
        }

        result.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            if (sort === "latest") {
                return dateB - dateA;
            }

            return dateA - dateB;
        });

        return result;
    }, [feeds, keyword, sort]);

    const handleToggleAll = () => {
        const visibleIds = filteredFeeds.map((feed) => feed.id);

        const isAllSelected =
            visibleIds.length > 0 &&
            visibleIds.every((id) => selectedFeeds.includes(id));

        if (isAllSelected) {
            setSelectedFeeds((prev) =>
                prev.filter((id) => !visibleIds.includes(id))
            );
        } else {
            setSelectedFeeds((prev) => Array.from(new Set([...prev, ...visibleIds])));
        }
    };

    const handleDelete = () => {
        if (selectedFeeds.length === 0) return;

        setOpenDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await Promise.all(selectedFeeds.map((postId) => deletePost(postId)));

            setSelectedFeeds([]);
            setOpenDeleteModal(false);

            await loadFeeds();
        } catch (err) {
            console.error(err);
            setOpenDeleteModal(false);
            alert("게시글 삭제에 실패했습니다.");
        }
    };

    const isAllVisibleSelected =
        filteredFeeds.length > 0 &&
        filteredFeeds.every((feed) => selectedFeeds.includes(feed.id));

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
                                checked={isAllVisibleSelected}
                                onChange={handleToggleAll}
                                className="mr-4 h-5 w-5 accent-[#f79977]"
                            />

                            <p className="font-medium text-gray-700">전체 선택</p>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {loading ? (
                                <div className="py-20 text-center text-gray-400">
                                    피드 목록을 불러오는 중입니다.
                                </div>
                            ) : error ? (
                                <div className="py-20 text-center text-red-400">
                                    {error}
                                </div>
                            ) : filteredFeeds.length > 0 ? (
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