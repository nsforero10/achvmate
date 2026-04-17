# @achvmate/database 💽

This pure module serves as the **Single Source of Truth** for the entire AchvMate backend ecosystem. It securely encapsulates all raw schema declarations, migrations, and generation hooks natively within `Prisma`.

## 📐 Architecture Benefits

By explicitly mapping Prisma independently here, we prevent messy redundant generation paths cleanly exporting native TypeScript bindings explicitly upstream toward `@achvmate/web` and `@achvmate/api`.

### Models

- `User`: Standard authentication references mappings.
- `Habit`: Frequency payloads tied directly to the parent User safely.
- `DailyTrackEntry`: Secure associative entities pinning boolean tracking updates directly to calendar timestamps cleanly.
- `JournalEntry`: Functional raw markup mappings.

## 🗄 Seeding & Synthetic Data

The package includes a comprehensive, intelligent seed generator mapped securely in `prisma/seed-history.ts` that safely spins up completely flawless multi-dimensional habit structures yielding exact 45-day rolling streaks directly into the analytics graphs seamlessly!

## 🚀 Available Commands

Run these dynamically utilizing TurboRepo bounds safely:

```bash
# Validate the schema and compile mappings explicitly
npx turbo run db:generate

# Push schema directly cleanly to development mapped Database 
npx turbo run db:push

# Launch the visual schema editing matrix locally 
npx prisma studio

# Inject intelligent mapping streaks completely into datasets 
npx turbo run db:seed
```
