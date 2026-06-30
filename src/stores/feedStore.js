import { create } from "zustand";

export const useFeedStore = create((set) => ({
  feeds: [],
  addFeed: (feed) =>
    set((state) => ({
      feeds: [{ id: Date.now(), ...feed }, ...state.feeds],
    })),
}));
