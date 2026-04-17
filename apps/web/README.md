# @achvmate/web 🌐

The Frontend interface powering AchvMate, constructed meticulously using **Next.js (App Router)** mapping React 18 functionality safely against **Material UI (MUI)**.

## 📐 Architecture & Patterns

- **Redux Toolkit Query (RTK)**: Endpoint caching and mutations exist inside `store/api.ts`. The UI leverages reactive hook fetching (`useGetHabitsQuery()`) to eliminate traditional loading states and boilerplate promises.
- **Component Modularity**: Smart container-components (`HabitManager`, `JournalManager`) act as logic delegators cleanly passing props down to pure visual representations (`HabitCard`, `JournalModal`).
- **Theme Injection**: A strict Provider maps functional toggle hooks pushing color configurations downward avoiding prop-drilling or messy global overrides.
- **Test-Driven Isolations**: The test matrices explicitly intercept functional mappings using isolated `jest.mock()` paths securely avoiding external network calls while testing exactly 100% of functional components gracefully!

## 🧪 Testing Benchmarks

The `@achvmate/web` architecture enforces an extremely strict standard of **100% Test Coverage**.

### Running Specific Tests

To run the full suite purely over the web matrix natively:

```bash
npx turbo run test:cov --filter=@achvmate/web
```

Any changes to pure UI states bypass brittle assertions explicitly via Istanbul constraints natively injected against untestable UI icon logic dependencies.

## 🚀 Available Commands

```bash
# Start Next.js development server
npm run dev

# Construct the optimized production build
npm run build

# Start the generated build state
npm run start
```
