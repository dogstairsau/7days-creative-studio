"use client";

import { CREATIVE_PRESETS, type CreativePresetId } from "@/creative/presets";

export function PresetPicker({
  value,
  onChange,
}: {
  value: CreativePresetId;
  onChange: (id: CreativePresetId) => void;
}) {
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
            onClick={() => onChange(preset.id)}
          >
            <span className="studio-preset__label">{preset.label}</span>
            <span className="studio-preset__desc">{preset.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
