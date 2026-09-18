# Seven Days Creative Studio

Internal AI creative production studio for Seven Days To Launch.

This repository started from OpenHiggsfield and is being adapted into a client-workspace production tool for:

- website hero imagery
- product and lifestyle imagery
- campaign creative
- social assets
- hero video
- reusable client brand context
- generation history and approvals

## Current foundation

The app already includes:

- image and video generation UI
- model catalog and per-model settings
- uploads and asset reuse
- generation history
- favorites
- batch generation
- gallery and viewer
- server-side generation calls

## V1 direction

The V1 workstream now includes:

- Seven Days branding
- provider abstraction
- Kie.ai server provider
- client workspaces
- client brand kits
- automatic brand-context injection
- task-first generation presets
- preset-driven model and aspect-ratio setup
- per-run client and creative-type metadata
- approve-for-client state
- client-aware production filenames

### Kie.ai status

When `KIE_API_KEY` is present, the studio automatically uses Kie.ai and no browser API key is required.

The first production mapping is intentionally narrow:

- `flux-2` text-to-image → `flux-2/pro-text-to-image`
- `flux-2` with references → `flux-2/pro-image-to-image`
- status polling → `/api/v1/jobs/recordInfo`

The rest of the model catalog still uses the legacy provider until its Kie adapters are added.

## Local setup

```bash
pnpm install
pnpm dev
```

## Environment

```bash
HF_API_BASE_URL=
KIE_API_KEY=
KIE_API_BASE_URL=https://api.kie.ai
OPEN_HIGGSFIELD_READ_WRITE_TOKEN=
NEXT_PUBLIC_SITE_URL=
```

The existing OpenHiggsfield provider remains available while the Kie adapter is introduced behind the provider layer.
