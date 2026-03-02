# AI Admin Assistant for a Trade Business (Frontend + BFF Monorepo)

This repository contains:
- **Next.js frontend** (`apps/web`)
- **NestJS BFF** (`apps/bff`)
- **Shared types/schemas** (`packages/shared`)

The real backend is intentionally separate. The BFF can switch between a local mock adapter and a future external backend adapter.

## Quick Start

1. Copy env file:
   ```bash
   cp .env.example .env
   ```
2. Install deps:
   ```bash
   pnpm install
   ```
3. Run web + bff:
   ```bash
   pnpm dev
   ```

- Web: http://localhost:3000
- BFF: http://localhost:4000

## Environment variables

See `.env.example`.

Key vars:
- `NEXT_PUBLIC_BFF_URL`: web -> bff base url
- `ADMIN_USER` / `ADMIN_PASS`: MVP admin login credentials
- `PERSISTENCE=memory|file`: in-memory or file-based persistence (`apps/bff/data/db.json`)
- `LLM_MODE=stub|openai`: quote drafting strategy
- `USE_EXTERNAL_BACKEND=true|false`: choose external adapter (future real backend)
- `BASE_BACKEND_URL`: base URL for external backend adapter
- `OPENAI_API_KEY`: required only when `LLM_MODE=openai`

## Implemented MVP journeys

### Public site
- `/` landing page
- `/quote` quote form submits lead to `POST /api/v1/leads`
- `/quote/success` confirmation page

### Admin
- `/admin/login`
- `/admin/leads`
- `/admin/leads/[id]` with status updates, follow-up scheduling, quote draft generation, and message send
- `/admin/reminders` upcoming follow-ups

### BFF API (`/api/v1`)
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`
- `POST /leads`
- `GET /leads`
- `GET /leads/:id`
- `PATCH /leads/:id`
- `POST /leads/:id/draft-quote`
- `POST /leads/:id/messages`

## Quality & Tooling
- TypeScript across FE/BFF/shared
- Zod validation in shared + BFF controllers
- Pino HTTP logging in BFF
- Unit tests (lead service + quote draft service)
- E2E smoke test for BFF endpoints (supertest)
- ESLint + Prettier
- GitHub Actions CI (`install`, `lint`, `test`)

## External Backend Integration Plan
- `ExternalBackendAdapter` is included and disabled by default.
- Enable with:
  - `USE_EXTERNAL_BACKEND=true`
  - `BASE_BACKEND_URL=<real backend>`
- The mock adapter remains the default local development path.
