import type { GenerationPlane } from "../catalog/types";
import type { GenerationStatus, QueuedGeneration } from "../platform";
import type { GenerationProvider } from "./types";

type KieProviderOptions = {
  apiKey: string;
  baseUrl?: string;
  fetch?: typeof fetch;
};

export function createKieProvider(options: KieProviderOptions): GenerationProvider {
  const baseUrl = (options.baseUrl ?? "https://api.kie.ai").replace(/\/$/, "");
  const fetchImpl = options.fetch ?? fetch;

  async function request(path: string, init?: RequestInit): Promise<Record<string, unknown>> {
    const response = await fetchImpl(`${baseUrl}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${options.apiKey}`,
        "Content-Type": "application/json",
      },
    });

    const text = await response.text();
    let payload: unknown = null;
    try {
      payload = text ? JSON.parse(text) : null;
    } catch {
      payload = text;
    }

    const record = asRecord(payload);
    if (!response.ok) {
      throw new Error(messageOf(record) ?? `Kie request failed (${response.status})`);
    }
    return record;
  }

  return {
    id: "kie",
    label: "Kie.ai",

    async submit(plane: GenerationPlane): Promise<QueuedGeneration> {
      const body = toKieTask(plane);
      const payload = await request("/api/v1/jobs/createTask", {
        method: "POST",
        body: JSON.stringify(body),
      });
      const data = asRecord(payload.data);
      const taskId = stringValue(data.taskId);
      if (!taskId) throw new Error(messageOf(payload) ?? "Kie response missing taskId");

      return {
        status: "queued",
        requestId: taskId,
        statusUrl: `/api/v1/jobs/recordInfo?taskId=${encodeURIComponent(taskId)}`,
        cancelUrl: "",
      };
    },

    async status(requestId: string): Promise<GenerationStatus> {
      const payload = await request(
        `/api/v1/jobs/recordInfo?taskId=${encodeURIComponent(requestId)}`,
        { method: "GET" },
      );
      const data = asRecord(payload.data);
      const state = stringValue(data.state) ?? "waiting";
      const model = stringValue(data.model) ?? "";
      const result = parseResult(data.resultJson);
      const urls = Array.isArray(result.resultUrls)
        ? result.resultUrls.filter((value): value is string => typeof value === "string")
        : [];

      if (state === "success") {
        if (isVideoModel(model)) {
          return {
            status: "completed",
            requestId,
            ...(urls[0] ? { video: { url: urls[0] } } : {}),
          };
        }
        return {
          status: "completed",
          requestId,
          ...(urls.length ? { images: urls.map((url) => ({ url })) } : {}),
        };
      }

      if (state === "fail") {
        return {
          status: "failed",
          requestId,
          error: stringValue(data.failMsg) ?? messageOf(payload) ?? "Kie generation failed",
        };
      }

      return { status: "generating", requestId };
    },
  };
}

function toKieTask(plane: GenerationPlane): Record<string, unknown> {
  if (plane.model !== "flux-2") {
    throw new Error(
      `Kie.ai is not mapped for ${plane.model} yet. Use Flux 2 while the remaining model adapters are added.`,
    );
  }

  const references = plane.media.reference?.map((item) => item.url).filter(Boolean) ?? [];
  const resolution = String(plane.settings.resolution ?? "1k").toUpperCase();
  const aspectRatio = String(plane.settings.aspectRatio ?? "1:1");

  if (references.length > 0) {
    return {
      model: "flux-2/pro-image-to-image",
      input: {
        input_urls: references,
        prompt: plane.prompt.text,
        aspect_ratio: aspectRatio,
        resolution,
        nsfw_checker: false,
      },
    };
  }

  return {
    model: "flux-2/pro-text-to-image",
    input: {
      prompt: plane.prompt.text,
      aspect_ratio: aspectRatio,
      resolution,
      nsfw_checker: false,
    },
  };
}

function parseResult(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  if (typeof value !== "string" || !value) return {};
  try {
    return asRecord(JSON.parse(value));
  } catch {
    return {};
  }
}

function isVideoModel(model: string): boolean {
  return /video|kling|seedance|wan|hailuo|pixverse|runway/i.test(model);
}

function asRecord(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function stringValue(value: unknown): string | undefined {
  return typeof value === "string" && value ? value : undefined;
}

function messageOf(payload: Record<string, unknown>): string | undefined {
  return stringValue(payload.msg) ?? stringValue(payload.message);
}
