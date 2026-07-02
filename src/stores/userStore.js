import { create } from "zustand";

export const useUserStore = create((set) => ({
    user: {
        name: "",
        profileImage: "",
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