/* Seven Days Creative Studio identity and metadata. */

function resolveOrigin(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveOrigin();

export const SITE_NAME = "Seven Days Creative Studio";
export const SITE_DESCRIPTOR = "AI creative production for client work";
export const SITE_TITLE = `${SITE_NAME} — ${SITE_DESCRIPTOR}`;

export const SITE_DESCRIPTION =
  "An internal creative production studio for generating website imagery, product shots, campaign assets and video from one workspace.";

export const STUDIO_BG = "#0a0a0b";

export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Seven Days Creative Studio on a dark field.",
};

export function openGraphFor({
  path,
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
}: {
  path: string;
  title?: string;
  description?: string;
}) {
  return {
    type: "website" as const,
    siteName: SITE_NAME,
    locale: "en_AU",
    url: path,
    title,
    description,
    images: [OG_IMAGE],
  };
}

export function twitterFor({
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
}: { title?: string; description?: string } = {}) {
  return {
    card: "summary_large_image" as const,
    title,
    description,
    images: [OG_IMAGE],
  };
}
