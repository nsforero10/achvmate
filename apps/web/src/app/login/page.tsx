import type { Metadata } from "next";
import { LoginCard } from "./LoginCard";

export const metadata: Metadata = {
  title: "Log in — AchvMate",
  description: "Sign in or create an account to start tracking your habits.",
};

export default function LoginPage() {
  return <LoginCard />;
}
