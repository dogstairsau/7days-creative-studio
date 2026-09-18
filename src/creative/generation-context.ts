import type { GenerationPlane } from "@/generation/catalog/types";

import { buildBrandPrompt } from "./brand-context";
import { getCreativePreset, type CreativePresetId } from "./presets";
import { activeWorkspace, useStudio } from "./studio-store";

export type StudioRunContext = {
  workspaceId?: string;
  workspaceName?: string;
  presetId: CreativePresetId;
  presetLabel: string;
};

export function currentStudioRunContext(): StudioRunContext {
  const workspace = activeWorkspace();
  const preset = getCreativePreset(useStudio.getState().preset);
  return {
    workspaceId: workspace?.id,
    workspaceName: workspace?.name,
    presetId: preset.id,
    presetLabel: preset.label,
  };
}

export function enrichGenerationPlane(plane: GenerationPlane): GenerationPlane {
  const state = useStudio.getState();
  const preset = getCreativePreset(state.preset);
  const workspace = activeWorkspace();

  const brief = [
    preset.defaultPrompt,
    preset.compositionHint ? `Composition requirement: ${preset.compositionHint}.` : "",
    workspace ? buildBrandPrompt({ ...workspace, clientName: workspace.name }) : "",
  ]
    .filter(Boolean)
    .join("\n");

  if (!brief) return plane;

  return {
    ...plane,
    prompt: {
      text: [
        plane.prompt.text.trim(),
        "",
        "Seven Days production context:",
        brief,
        "Keep the requested subject and user intent primary. Treat brand context as art direction.",
      ]
        .filter(Boolean)
        .join("\n"),
    },
  };
}
