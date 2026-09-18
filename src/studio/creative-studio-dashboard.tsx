"use client";

import { useEffect } from "react";

import { getCreativePreset } from "@/creative/presets";
import { applyCreativePreset } from "@/creative/studio-controller";
import { activeWorkspace, useStudio } from "@/creative/studio-store";

import { OpenHiggsfieldApp } from "@/openhiggsfield/openhiggsfield-app";
import { PresetPicker } from "./preset-picker";
import { WorkspacePanel } from "./workspace-panel";

export function CreativeStudioDashboard({ fontClassName = "" }: { fontClassName?: string }) {
  const preset = useStudio((state) => state.preset);
  const workspaces = useStudio((state) => state.workspaces);
  const activeWorkspaceId = useStudio((state) => state.activeWorkspaceId);
  const selected = getCreativePreset(preset);
  const workspace =
    workspaces.find((entry) => entry.id === activeWorkspaceId) ?? activeWorkspace();

  useEffect(() => {
    applyCreativePreset(preset);
  }, [preset]);

  return (
    <div className={`studio-dashboard ${fontClassName}`}>
      <div className="studio-dashboard__rail">
        <WorkspacePanel />
        <PresetPicker />

        <section className="studio-panel studio-panel--brief">
          <div className="studio-panel__eyebrow">Creative direction</div>
          <div className="studio-panel__title">{selected.label}</div>
          <p>{selected.defaultPrompt || "Start from a blank brief and choose the model yourself."}</p>
          {selected.ratioHint && (
            <div className="studio-chip">Suggested ratio: {selected.ratioHint}</div>
          )}
          {selected.compositionHint && (
            <div className="studio-chip">Composition: {selected.compositionHint}</div>
          )}
          <div className="studio-context-status">
            <span className="studio-context-status__dot" />
            {workspace
              ? `${workspace.name} brand context will be added automatically on Generate.`
              : "Add a client workspace to inject brand context automatically."}
          </div>
        </section>
      </div>

      <div className="studio-dashboard__canvas">
        <OpenHiggsfieldApp />
      </div>
    </div>
  );
}
