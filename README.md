# EV08 — P3F4 — ViveMedellín · Módulo de Grupos (Front)

Front de **creación y gestión de grupos** para el proyecto ViveMedellín.  
Estado: En construcción. HU-01 (validar acceso) y HU-02 (crear grupo) en progreso.

## Stack

- **Next.js 15** + **React** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **React Hook Form** + **Zod** (validaciones)
- Toasts con **sonner**
- (Auth demo local) `src/lib/auth.ts`

## Requisitos

- Node.js ≥ **20** (probado con 22.x)
- npm (ó pnpm/yarn si el equipo lo define)

## Arranque rápido

```bash
git clone <URL-de-este-repo>
cd vivemedellin-grupos
npm i
npm run dev
# abre http://localhost:3000
- HU-03: Unirse a grupo público (WIP)
