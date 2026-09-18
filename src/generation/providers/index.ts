import type { GenerationPlane } from "../catalog/types";
import type { GenerationStatus, QueuedGeneration } from "../platform";
import { createPlatformClient } from "../platform";
import { toPlatform } from "../to-platform";
import type { GenerationProvider } from "./types";

export function createLegacyProvider(options: {
  apiKey: string;
  baseUrl: string;
}): GenerationProvider {
  const client = createPlatformClient(options);
  return {
    id: "legacy",
    label: "Generation API",
    async submit(plane: GenerationPlane): Promise<QueuedGeneration> {
      const { path, body } = toPlatform(plane);
      return client.submit(path, body);
    },
    async status(requestId: string): Promise<GenerationStatus> {
      return client.status(requestId);
    },
  };
}

/*
 * Kie.ai is intentionally isolated behind this provider boundary.
 * Its model slugs and request payloads differ by model family, so the next step
 * is a thin mapping layer from our normalized GenerationPlane to selected Kie
 * endpoints instead of leaking Kie-specific fields throughout the studio UI.
 */
