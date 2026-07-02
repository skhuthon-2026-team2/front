import instance from "./instance";

export const getClubPosts = (clubId) => {
    return instance.get(`/api/clubs/${clubId}/posts`);
};

export const deletePost = (postId) => {
    return instance.delete(`/api/posts/${postId}`);
};