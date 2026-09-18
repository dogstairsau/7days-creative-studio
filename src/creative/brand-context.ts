export type BrandContext = {
  clientName: string;
  website?: string;
  summary?: string;
  colours?: string[];
  fonts?: string[];
  visualDirection?: string;
  doNot?: string[];
};

export function buildBrandPrompt(context: BrandContext): string {
  const parts = [
    `Client: ${context.clientName}`,
    context.summary ? `Brand summary: ${context.summary}` : "",
    context.visualDirection ? `Visual direction: ${context.visualDirection}` : "",
    context.colours?.length ? `Brand colours: ${context.colours.join(", ")}` : "",
    context.fonts?.length ? `Brand typography: ${context.fonts.join(", ")}` : "",
    context.doNot?.length ? `Avoid: ${context.doNot.join(", ")}` : "",
  ].filter(Boolean);

  return parts.join("\n");
}
