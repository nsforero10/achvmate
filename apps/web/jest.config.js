const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  collectCoverageFrom: [
    "src/store/**/*.{ts,tsx}",
    "!src/store/index.ts",
    "!src/store/api.ts",
    "src/lib/**/*.{ts,tsx}",
    "src/components/habits/HabitManager.tsx",
    "src/components/journal/JournalManager.tsx",
    "src/app/login/LoginCard.tsx",
    "src/components/layout/Sidebar.tsx",
  ],
  coverageDirectory: "./coverage",
};

module.exports = createJestConfig(customJestConfig);
