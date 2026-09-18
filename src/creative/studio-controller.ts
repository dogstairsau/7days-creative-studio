"use client";

import { getModel } from "@/generation/catalog";
import { useActive } from "@/generation/stores/active";
import { useSettings } from "@/generation/stores/settings";

import { getCreativePreset, type CreativePresetId } from "./presets";

const MODEL_FOR_PRESET: Partial<Record<CreativePresetId, string>> = {
  "website-hero": "flux-2",
  "product-shot": "flux-2",
  lifestyle: "flux-2",
  "section-image": "flux-2",
  "ad-creative": "ideogram-4",
  social: "ideogram-4",
};

export function applyCreativePreset(id: CreativePresetId) {
  const preset = getCreativePreset(id);
  const modelId = MODEL_FOR_PRESET[id];

  if (modelId) {
    const model = getModel(modelId);
    useActive.getState().setModel(model.id);

    if (preset.ratioHint && model.settings.aspectRatio?.type === "enum") {
      const supported = model.settings.aspectRatio.values.includes(preset.ratioHint);
      if (supported) {
        useSettings.getState().set(model.id, { aspectRatio: preset.ratioHint });
      }
    }
  }
}
