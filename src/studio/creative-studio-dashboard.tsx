"use client";

import { useState } from "react";

import { getCreativePreset, type CreativePresetId } from "@/creative/presets";

import { OpenHiggsfieldApp } from "@/openhiggsfield/openhiggsfield-app";
import { PresetPicker } from "./preset-picker";
import { WorkspacePanel } from "./workspace-panel";

export function CreativeStudioDashboard({ fontClassName = "" }: { fontClassName?: string }) {
  const [preset, setPreset] = useState<CreativePresetId>("website-hero");
  const selected = getCreativePreset(preset);

  return (
    <div className={`studio-dashboard ${fontClassName}`}>
      <div className="studio-dashboard__rail">
        <WorkspacePanel />
        <PresetPicker value={preset} onChange={setPreset} />

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
        </section>
      </div>

      <div className="studio-dashboard__canvas">
        <OpenHiggsfieldApp />
      </div>
    </div>
  );
}
