# SilverArch Digital Agency

## Stack
- Next.js 16 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v4 + Shadcn/ui (new-york style)
- Framer Motion for animations
- Supabase (Postgres + Auth + Storage)
- Server Actions for mutations, Zod v4 for validation

## Architecture
- Route groups: `(public)`, `(auth)`, `(admin)` for layout isolation
- Server Components by default, `"use client"` only for interactive elements
- Dark-only theme: bg #0b0b0f, card #111116, border #1f1f25, accent purple→blue→cyan
- Middleware protects /admin/* routes (Supabase auth)

## Key Directories
- `src/app/` — App Router pages
- `src/components/` — UI components (ui/, layout/, sections/, shared/, forms/, admin/)
- `src/actions/` — Server Actions (CRUD for all entities)
- `src/schemas/` — Zod validation schemas
- `src/types/` — TypeScript type definitions
- `src/lib/` — Utilities, Supabase clients, constants, animations
- `supabase/migrations/` — SQL schema, RLS policies, seed data

## Commands
- `npm run dev` — development server
- `npm run build` — production build
- `npm run lint` — ESLint
