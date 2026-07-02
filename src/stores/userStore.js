import { create } from "zustand";

const defaultUser = {
  name: "",
  profileImage: "",
};

export const useUserStore = create((set) => ({
  user: defaultUser,
  setUser: (user) =>
    set((state) => ({
      user: {
        ...state.user,
        ...user,
      },
    })),
  setProfileImage: (profileImage) =>
    set((state) => ({
      user: {
        ...state.user,
        profileImage,
      },
    })),
  resetUser: () => set({ user: defaultUser }),
}));
