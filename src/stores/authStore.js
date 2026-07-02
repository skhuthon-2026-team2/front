import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  setLoggedIn: (user = null) => set({ isLoggedIn: true, user }),
  setLoggedOut: () => set({ isLoggedIn: false, user: null }),
}));
