"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { browserStorage } from "@/generation/stores/browser-storage";
import type { CreativePresetId } from "./presets";
import type { ClientWorkspace } from "./workspaces";
import { createWorkspace } from "./workspaces";

type StudioState = {
  workspaces: ClientWorkspace[];
  activeWorkspaceId: string | null;
  preset: CreativePresetId;
  addWorkspace: (name: string) => string | null;
  setActiveWorkspace: (id: string) => void;
  updateActiveWorkspace: (patch: Partial<ClientWorkspace>) => void;
  setPreset: (preset: CreativePresetId) => void;
};

export const useStudio = create<StudioState>()(
  persist(
    (set, get) => ({
      workspaces: [],
      activeWorkspaceId: null,
      preset: "website-hero",

      addWorkspace: (name) => {
        if (!name.trim()) return null;
        const workspace = createWorkspace(name);
        set((state) => ({
          workspaces: [workspace, ...state.workspaces],
          activeWorkspaceId: workspace.id,
        }));
        return workspace.id;
      },

      setActiveWorkspace: (id) => {
        if (!get().workspaces.some((workspace) => workspace.id === id)) return;
        set({ activeWorkspaceId: id });
      },

      updateActiveWorkspace: (patch) => {
        const activeWorkspaceId = get().activeWorkspaceId;
        if (!activeWorkspaceId) return;
        set((state) => ({
          workspaces: state.workspaces.map((workspace) =>
            workspace.id === activeWorkspaceId
              ? { ...workspace, ...patch, updatedAt: Date.now() }
              : workspace,
          ),
        }));
      },

      setPreset: (preset) => set({ preset }),
    }),
    {
      name: "7days.creative-studio.v1",
      storage: browserStorage(),
      partialize: (state) => ({
        workspaces: state.workspaces,
        activeWorkspaceId: state.activeWorkspaceId,
        preset: state.preset,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        if (
          state.activeWorkspaceId &&
          !state.workspaces.some((workspace) => workspace.id === state.activeWorkspaceId)
        ) {
          state.setActiveWorkspace(state.workspaces[0]?.id ?? "");
        }
      },
    },
  ),
);

export function activeWorkspace(): ClientWorkspace | null {
  const state = useStudio.getState();
  return (
    state.workspaces.find((workspace) => workspace.id === state.activeWorkspaceId) ??
    state.workspaces[0] ??
    null
  );
}
