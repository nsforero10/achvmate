import { auth } from "../../auth";
import { redirect } from "next/navigation";
import { JournalManager } from "../../components/journal/JournalManager";

export default async function JournalPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
  const dateString = today.toLocaleDateString("en-US", options);

  return <JournalManager dateString={dateString} />;
}
