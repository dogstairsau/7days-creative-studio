import type { GenerationPlane } from "../catalog/types";
import type { GenerationStatus, QueuedGeneration } from "../platform";

export type GenerationProvider = {
  id: string;
  label: string;
  submit(plane: GenerationPlane): Promise<QueuedGeneration>;
  status(requestId: string): Promise<GenerationStatus>;
};
