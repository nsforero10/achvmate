"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { HistoryCalendarView } from "./HistoryCalendarView";
import { HistoryGalleryView } from "./HistoryGalleryView";
import { PageLayout } from "../layout/PageLayout";
import { DashboardHeader } from "../habits/DashboardHeader";

export function HistoryDashboard({ habits }: { habits: any[] }) {
  const [tabIndex, setTabIndex] = useState(0);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const today = new Date();
  const dateString = today.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const tabs = (
    <Box sx={{ px: 4, pb: 1 }}>
      <Tabs 
        value={tabIndex} 
        onChange={(e, v) => setTabIndex(v)}
        sx={{
          minHeight: 36,
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 600,
            fontSize: "1rem",
            minHeight: 36,
            mr: 2,
          }
        }}
      >
        <Tab label="Contribution Map" disableRipple />
        <Tab label="Habit Tracks" disableRipple />
      </Tabs>
    </Box>
  );

  return (
    <PageLayout
      header={<DashboardHeader title="History Analytics" dateString={dateString} />}
      middleComponent={tabs}
    >
      <Box sx={{ p: 2 }}>
        {tabIndex === 0 && <HistoryCalendarView habits={habits} />}
        {tabIndex === 1 && <HistoryGalleryView habits={habits} />}
      </Box>
    </PageLayout>
  );
}
