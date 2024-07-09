"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LoaderStore {
  duration: number;
  setDuration: (duration: number) => void;
}

export const useLoaderStore = create<LoaderStore>()(
  persist(
    (set) => ({
      duration: 5000,
      setDuration: (duration) => set({ duration }),
    }),
    {
      name: "loader-storage",
    },
  ),
);
