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

The V1 workstream adds:

- Seven Days branding
- provider abstraction
- Kie.ai support
- client workspaces
- client brand kits
- task-first generation presets
- approvals and production export

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
