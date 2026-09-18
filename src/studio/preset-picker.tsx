"use client";

import { CREATIVE_PRESETS } from "@/creative/presets";
import { applyCreativePreset } from "@/creative/studio-controller";
import { useStudio } from "@/creative/studio-store";

export function PresetPicker() {
  const value = useStudio((state) => state.preset);
  const setPreset = useStudio((state) => state.setPreset);

  function choose(id: typeof value) {
    setPreset(id);
    applyCreativePreset(id);
  }

  return (
    <section className="studio-panel" aria-label="Creative type">
      <div className="studio-panel__eyebrow">What are you creating?</div>
      <div className="studio-presets">
        {CREATIVE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className="studio-preset"
            data-active={value === preset.id}
            onClick={() => choose(preset.id)}
          >
            <span className="studio-preset__label">{preset.label}</span>
            <span className="studio-preset__desc">{preset.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
