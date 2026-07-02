import api from "./axios";

const userId = () => localStorage.getItem("userId");

// 내가 속한 동아리 목록
export const getMyClubs = () =>
  api.get("/api/main/clubs/my-clubs", { params: { userId: userId() } });

// 동아리 상세
export const getClub = (clubId) => api.get(`/api/main/clubs/${clubId}`);

// 동아리 생성
export const createClub = (body) => api.post("/api/main/clubs", body);

// 동아리 가입 (초대코드 검증 + 가입)
export const joinClub = (clubId, body) =>
  api.post(`/api/main/clubs/${clubId}/members/join`, body, {
    params: { userId: userId() },
  });

// 동아리 멤버 목록 (페이징 → content 반환)
export const getClubMembers = (clubId) =>
  api.get(`/api/clubs/${clubId}/members`, { params: { page: 0, size: 20 } })
    .then((data) => data.content ?? []);
