import api from "./axios";

const userId = () => localStorage.getItem("userId");

export const getMyProfile = () =>
    api.get("/api/mypage/me", {
        params: { userId: userId() },
    });

export const updateMyProfile = (imageUrl) =>
    api.patch(
        "/api/mypage/profile",
        { imageUrl },
        {
            params: { userId: userId() },
        }
    );