import { create } from "zustand";

export const useUserStore = create((set) => ({
    user: {
        name: "김서연",
        email: "kim@example.com",
        profileImage: "https://i.pravatar.cc/300?img=47",
    },

    setProfileImage: (profileImage) =>
        set((state) => ({
            user: {
                ...state.user,
                profileImage,
            },
        })),

    setUser: (user) =>
        set({
            user,
        }),
}));