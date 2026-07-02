import api from "./axios";

const userId = () => localStorage.getItem("userId");

// 내 정보 조회
export const getMyProfile = () =>
    api.get("/api/mypage/me", {
        params: userId() ? { userId: userId() } : undefined,
    });

// 나의 기본 프로필 수정
export const updateMyProfile = (imageUrl) =>
    api.patch(
        "/api/mypage/profile",
        { imageUrl },
        {
            params: userId() ? { userId: userId() } : undefined,
        }
    );

// 동아리별 프로필 수정
export const updateClubProfile = (clubId, clubMemberId, nickname) =>
    api.patch(
        `/api/mypage/clubs/${clubId}/profile`,
        { nickname },
        {
            params: {
                clubMemberId,
            },
        }
    );
// 내가 만든 피드 목록 조회
export const getMyFeeds = (page = 0, size = 20) =>
    api.get("/api/mypage/feeds", {
        params: {
            ...(userId() ? { userId: userId() } : {}),
            page,
            size,
        },
    });
// 타임라인 목록 조회
export const getMyTimelines = (page = 0, size = 20) =>
    api.get("/api/mypage/timelines", {
        params: {
            userId: userId(),
            page,
            size,
        },
    });