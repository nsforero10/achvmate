import { HistoryDashboard } from "../../../components/history/HistoryDashboard";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

export default async function HabitHistoryPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return <HistoryDashboard />;
}
