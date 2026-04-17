# @achvmate/api ⚙️

The powerhouse backend server constructed safely using **NestJS**, actively providing deeply secure REST interfaces strictly validating external Next.js mutations.

## 📐 Security & Data Architecture

- **Auth Strategy**: Relies heavily on `@nestjs/passport` implementing a localized `JwtStrategy`. However, instead of demanding generic Bearer tokens securely, it uses a functional `cookieExtractor` to actively scrape `next-auth.session-token` footprints generated explicitly by the Web Client.
- **Dependency Injection**: Services (`HabitsService`, `JournalService`) operate safely inside pure injectable structures, abstracting Prisma calls completely from the Controller mappings.
- **Prisma Integration**: This app natively consumes the isolated `@achvmate/database` Prisma client yielding robust automated TypeScript autocompletions cleanly across mapping operations.

## 🧪 Validation & Testing 

The test structure completely bypasses real database hooks utilizing comprehensive `jest.spyOn()` interceptors explicitly decoupling Database testing structures to achieve **100% Business Logic Validation**.

```bash
# Validate API components decoupled safely
npx turbo run test:cov --filter=@achvmate/api
```

## 🚀 Available Commands

```bash
# Start NestJS cleanly in watch mode
npm run dev

# Construct NestJS production build mappings 
npm run build

# Boot local unit tests mapping boundaries 
npm run test
```
