import Box from "@mui/material/Box";
import { Sidebar } from "../../../components/layout/Sidebar";
import { HistoryDashboard } from "../../../components/history/HistoryDashboard";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function HabitHistoryPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const API_BASE = process.env.INTERNAL_API_URL || "http://api:3000";
  const headerList = await headers();
  const cookie = headerList.get("cookie");

  let initialHabits = [];
  try {
    const res = await fetch(`${API_BASE}/habits`, {
      headers: {
        cookie: cookie || "",
      },
      cache: 'no-store'
    });
    if (res.ok) {
      initialHabits = await res.json();
    }
  } catch (e) {
    console.error("Initial fetch error:", e);
  }

  return <HistoryDashboard habits={initialHabits} />;
}
