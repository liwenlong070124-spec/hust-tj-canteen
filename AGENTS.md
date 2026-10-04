# AGENTS.md — hust-tj-canteen

## Project Overview

“同济食光”是华中科技大学同济医学院校区的本地美食图鉴：用可维护的本地注册表记录食堂、窗口、参考价格、营业时段与位置提示，并提供推荐浏览、随机“吃什么”、个人偏好三条主线。

- **双运行模式**：本地开发/验收 + 自有 ECS 的 Node 静态服务部署
- **前端基础**：Next.js 16.2+ App Router + TypeScript strict + Tailwind CSS v4
- **部署入口**：`https://lwl.husteread.com/canteen/`

## Tech Stack

- **Framework**: Next.js 16.2 (App Router, static export)
- **React**: 19.2
- **Language**: TypeScript (strict mode)
- **Package Manager**: pnpm
- **Styling**: Tailwind CSS v4 + hand-authored design tokens
- **Runtime**: Node.js 22.11.0 on production server; local Node 20+ is acceptable for development
- **Deployment**: `ssh MyECS` + rsync to a systemd-managed standalone Next server

## Key Commands

- Install: `pnpm install`
- Dev server: `pnpm dev`
- Typecheck: `pnpm tsc`
- Lint: `pnpm lint`
- Build: `pnpm build`
- Output checks: `pnpm check:output`
- Deploy: `bash scripts/deploy/ssh-deploy.sh`

## Definition of Done

1. `pnpm lint` passes.
2. `pnpm tsc` passes.
3. `pnpm build` passes and emits `out/`.
4. `pnpm check:output` reports no file over 25 MB and fewer than 20,000 files.
5. Data claims that are not sourced from an official/public page are labeled as reference/editorial data in the UI.
6. Commits use Conventional Commits, for example `feat(canteen): add food atlas shell`.

## Project Structure

```
src/
  app/                  route entry points and page metadata
  components/           shared UI primitives and AppShell
  features/canteen/     food atlas types, registry, cards, detail view
  features/eat/         random picker interaction
  features/profile/     local-only profile preferences
  lib/                  shared utilities
docs/                   architecture, design and operations notes
scripts/                build checks and ECS deployment helper
```

## Data and Editing SOP

The product is intentionally database-free for v0.1. Edit `src/features/canteen/registry.ts` to add or revise canteens, stalls, foods and sources. Keep these rules:

- use slugs for stable URLs;
- mark prices as `参考价` unless there is a dated public menu;
- include a source URL for factual venue claims;
- keep copy welcoming and avoid presenting user-submitted ratings as official facts;
- run `pnpm lint && pnpm tsc && pnpm build` after edits.

## Boundaries

- `src/app/` should only compose route-level UI; business data belongs in `src/features/`.
- Keep client components at the leaves. The static export must not depend on server actions or a database.
- Do not commit `.env*` secrets or build output.
- Do not use `middleware.ts`; this project has no request-time middleware.
