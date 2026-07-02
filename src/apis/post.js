import api from "./axios";

const userId = () => localStorage.getItem("userId");

// 동아리별 피드 목록 (페이징 → content 반환)
export const getClubPosts = (clubId) =>
  api.get(`/api/clubs/${clubId}/posts`, { params: { page: 0, size: 20 } })
    .then((data) => data.content ?? []);

// 피드 상세
export const getPost = (postId) => api.get(`/api/posts/${postId}`);

// 피드 작성
export const createPost = (clubId, body) =>
  api.post(`/api/clubs/${clubId}/posts`, body, { params: { userId: userId() } });

// 피드 삭제
export const deletePost = (postId) =>
  api.delete(`/api/posts/${postId}`, { params: { userId: userId() } });
