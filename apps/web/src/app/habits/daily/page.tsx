import Box from "@mui/material/Box";
import { Sidebar } from "../../../components/layout/Sidebar";
import { HabitManager } from "../../../components/habits/HabitManager";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function HabitTrackPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  // To fetch from server component using session cookies, we must use the Docker internal network name "api"
  const API_BASE = process.env.INTERNAL_API_URL || "http://api:3000";
  
  // To fetch from server component using session cookies:
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

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
  const dateString = today.toLocaleDateString("en-US", options);

  return (
    <Box 
      sx={{ 
        display: "flex", 
        height: "100vh", 
        bgcolor: "transparent", 
        p: 2, 
      }}
    >
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          borderRadius: 4,
          boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <HabitManager initialHabits={initialHabits} dateString={dateString} />
        {/* <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        </Box> */}
      </Box>
    </Box>
  );
}
