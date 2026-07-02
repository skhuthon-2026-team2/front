import { create } from "zustand";

export const useTimelineStore = create((set) => ({
  timelines: [],
  addTimeline: (timeline) =>
    set((state) => ({
      timelines: [{ id: Date.now(), ...timeline }, ...state.timelines],
    })),
  resetTimelines: () => set({ timelines: [] }),
}));
