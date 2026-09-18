export type CreativePresetId =
  | "website-hero"
  | "product-shot"
  | "lifestyle"
  | "section-image"
  | "ad-creative"
  | "social"
  | "custom";

export type CreativePreset = {
  id: CreativePresetId;
  label: string;
  description: string;
  defaultPrompt: string;
  compositionHint?: string;
  ratioHint?: string;
};

export const CREATIVE_PRESETS: CreativePreset[] = [
  {
    id: "website-hero",
    label: "Website Hero",
    description: "High-impact hero imagery with room for headline and CTA.",
    defaultPrompt:
      "Create a premium website hero image with clear subject hierarchy, realistic lighting and intentional negative space for headline and CTA.",
    compositionHint: "Subject offset from the copy area",
    ratioHint: "16:9",
  },
  {
    id: "product-shot",
    label: "Product Shot",
    description: "Clean, campaign-ready product imagery.",
    defaultPrompt:
      "Create a premium product image with clean composition, accurate materials, realistic lighting and polished commercial art direction.",
    ratioHint: "4:3",
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    description: "Brand-led lifestyle photography around a product or service.",
    defaultPrompt:
      "Create a natural lifestyle image with believable people, realistic environment, premium photography and authentic brand context.",
    ratioHint: "4:3",
  },
  {
    id: "section-image",
    label: "Section Image",
    description: "Supporting website imagery for feature and content sections.",
    defaultPrompt:
      "Create a refined supporting website image with restrained composition, brand-consistent styling and space that works inside a content section.",
    ratioHint: "4:3",
  },
  {
    id: "ad-creative",
    label: "Ad Creative",
    description: "Performance creative with a strong focal point.",
    defaultPrompt:
      "Create high-performing campaign creative with a strong visual hook, simple hierarchy and a clear focal point that can support ad copy.",
    ratioHint: "1:1",
  },
  {
    id: "social",
    label: "Social Creative",
    description: "Scroll-stopping organic or paid social imagery.",
    defaultPrompt:
      "Create bold social creative with an immediate visual hook, premium art direction and enough negative space for optional text overlay.",
    ratioHint: "4:5",
  },
  {
    id: "custom",
    label: "Custom",
    description: "Start from a blank creative brief.",
    defaultPrompt: "",
  },
];

export function getCreativePreset(id: CreativePresetId): CreativePreset {
  return CREATIVE_PRESETS.find((preset) => preset.id === id) ?? CREATIVE_PRESETS[0]!;
}
