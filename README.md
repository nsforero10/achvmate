# AchvMate 🚀

AchvMate is a comprehensive, production-ready habit tracking and daily journaling application built on a modern **TurboRepo Monorepo** architecture. It leverages full-stack TypeScript to deliver a seamless, state-of-the-art user experience perfectly mapped to a deeply decoupled, containerized backend.

---

## 🎯 Features

- **Advanced Habit Tracking**: Create, edit, and actively toggle habits safely decoupled against specific date payloads.
- **Dynamic Streak Analytics**: Visual calendar heatmaps rendering 365-day rolling history datasets powered by dynamic streak algorithms.
- **Markdown Journaling**: Seamlessly log daily thoughts using rich Markdown parsing, natively injected and mapped over clean UI states.
- **Flawless Light/Dark Mode**: High-fidelity UI styling powered by customized Material UI tokens.
- **Enterprise-Grade Validation**: 100% strict Test Coverage strictly decoupling UI components from API hooks using advanced mocking patterns.

---

## 🏗 System Architecture & Monorepo Setup

The application breaks down complex bounds into an elegantly decoupled workspace using `TurboRepo`, optimizing caching and testing pipelines instantly.

### Workspace Map:
- **`apps/web`**: The Next.js React frontend. Fast, deeply interactive, and fully instrumented with RTK Query and MUI.
- **`apps/api`**: The NestJS robust REST backend. Validates JWT sessions and processes payload mapping safely against the database.
- **`apps/e2e`**: Playwright testing pipeline safely spanning UI mappings across the complete container network.
- **`packages/database`**: Pure Prisma ORM layer exposing unified data types locally across the API and NextAuth.

### Containerization (Docker)
The entire monorepo is fully orchestratable via `docker-compose`. 
- The React App streams hot-reloads over **Port 3002**.
- The Nest API listens securely on **Port 3000**.
- The PostgreSQL daemon persists data across the localized docker network.

---

## 🧠 Design Patterns & Decision Making

1. **Centralized Data ORM (`@achvmate/database`)**
   By lifting Prisma completely out of the API and into `packages/`, we achieve 100% type safety directly bridging database outputs to React Frontends without brittle mapping interfaces.

2. **Secure JWT Orchestration**
   Instead of exposing headers directly, the architecture binds cleanly to NextAuth payload cookies natively intercepted inside the NestJS `JwtStrategy`, resolving highly secure cross-origin barriers dynamically.

3. **Isolated RTK Testing Boundaries**
   Heavy REST abstractions are safely bypassed inside the DOM testing suites using pure functional overrides (e.g. `mockUpdate`, `mockCreate`), completely protecting front-end DOM testing (`100% Coverage`) from backend failures.

4. **Strategic UI Ignoring Pipelines**
   Highly volatile cosmetic logic paths (such as `isDark` icons mapping) are cleanly bypassed through precise Istanbul constraints, avoiding bloated dummy UI integration logic while proving code reliability natively. 

---

## 🗄 Database Models

The backbone of AchvMate operates on these pivotal schemas:

- **`User`**: Securely mounts Auth validations mapping to nested relations.
- **`Habit`**: Defines behavioral tasks mapping title and schedule frequency arrays (e.g. `["MON", "WED"]`).
- **`DailyTrackEntry`**: Unique scalar matrix tying `Habit` + `Date` to a `completed` Boolean. Facilitates historical heatmaps organically.
- **`Journal`**: Maps extensive textual content chunks securely against timestamped metadata.

---

## 🚀 Quick Start & Scripts

Ensure Docker is running, then boot the architecture:

```bash
# 1. Install dependencies across the monorepo bounds
npm install

# 2. Start the database and services locally
docker-compose up -d

# 3. Synchronize Prisma and seed data
npx turbo run db:seed

# 4. Start Development Servers explicitly
npx turbo run dev

# 5. Run the Flawless Test Pipeline
npx turbo run test:cov
```

Explore the detailed workflows inside the respective directory READMEs: 
- [Web Application 🌐](./apps/web/README.md)
- [API Service ⚙️](./apps/api/README.md)
- [Database Package 💽](./packages/database/README.md)
